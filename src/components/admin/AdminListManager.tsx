
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash, ArrowUp, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useRealCuratedLists } from "@/hooks/useRealCuratedLists";

export function AdminListManager() {
  const { lists, isLoading, error } = useRealCuratedLists();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleTogglePin = (id: string) => {
    // TODO: Implement actual pin/unpin functionality with Supabase
    const list = lists.find(l => l.id === id);
    if (!list) return;
    
    toast({
      title: list.isPinned ? "List unpinned" : "List pinned",
      description: list.isPinned 
        ? `"${list.title}" has been removed from featured lists` 
        : `"${list.title}" is now featured on the homepage`
    });
  };
  
  const handleEdit = (id: string) => {
    navigate(`/curated-lists/${id}/edit`);
  };
  
  const handleDelete = (id: string) => {
    // TODO: Implement actual delete functionality with Supabase
    const list = lists.find(l => l.id === id);
    if (!list) return;
    
    toast({
      title: "List deleted",
      description: `"${list.title}" has been deleted`
    });
  };
  
  const handleManageProducts = (id: string) => {
    navigate(`/curated-lists/${id}/products`);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Curated Lists</h2>
          <Button disabled>
            <Plus className="w-4 h-4 mr-1" />
            New List
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-20"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-muted rounded w-24"></div>
                    <div className="flex gap-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-8 bg-muted rounded w-8"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Curated Lists</h2>
          <Button onClick={() => navigate('/curated-lists/create')}>
            <Plus className="w-4 h-4 mr-1" />
            New List
          </Button>
        </div>
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-destructive">Failed to load curated lists</h3>
          <p className="mt-2 text-muted-foreground">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Curated Lists</h2>
        <Button onClick={() => navigate('/curated-lists/create')}>
          <Plus className="w-4 h-4 mr-1" />
          New List
        </Button>
      </div>
      
      {lists.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold">No curated lists found</h3>
          <p className="mt-2 text-muted-foreground">Create your first curated list to get started.</p>
          <Button className="mt-4" onClick={() => navigate('/curated-lists/create')}>
            <Plus className="w-4 h-4 mr-1" />
            Create List
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {lists.map((list) => (
            <Card key={list.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {list.coverImage && (
                    <div 
                      className="w-full md:w-40 h-24 md:h-auto bg-cover bg-center" 
                      style={{ backgroundImage: `url(${list.coverImage})` }}
                    />
                  )}
                  <div className="flex-1 p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-medium">{list.title}</h3>
                        <p className="text-sm text-muted-foreground">{list.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {list.isPinned && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Featured
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {list.productIds.length} products
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2 mb-4">
                      {list.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="capitalize">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Updated {new Date(list.updatedAt).toLocaleDateString()}
                      </span>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleTogglePin(list.id)}
                          title={list.isPinned ? "Unpin from homepage" : "Pin to homepage"}
                        >
                          <ArrowUp className={`w-4 h-4 ${list.isPinned ? 'text-green-600' : ''}`} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(list.id)}
                          title="Edit list details"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleManageProducts(list.id)}
                          title="Manage products in list"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(list.id)}
                          title="Delete list"
                        >
                          <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
