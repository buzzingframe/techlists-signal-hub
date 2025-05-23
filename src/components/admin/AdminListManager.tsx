
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash, ArrowUp, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CuratedList } from "@/types/product";

// Mock curated lists
const mockLists: CuratedList[] = [
  {
    id: "1",
    title: "Essential Web3 Wallets",
    description: "The best wallets for managing your crypto assets securely",
    createdAt: "2025-04-15T10:30:00Z",
    updatedAt: "2025-05-10T14:45:00Z",
    createdBy: "admin",
    isPinned: true,
    coverImage: "/placeholder.svg",
    tags: ["wallet", "security", "beginners"],
    productIds: ["wallet1", "wallet2", "wallet3", "wallet4", "wallet5"]
  },
  {
    id: "2",
    title: "Top DeFi Platforms",
    description: "Leading decentralized finance platforms for yield farming and trading",
    createdAt: "2025-03-22T09:15:00Z",
    updatedAt: "2025-05-08T11:20:00Z",
    createdBy: "admin",
    isPinned: false,
    coverImage: "/placeholder.svg",
    tags: ["defi", "yield", "trading"],
    productIds: ["defi1", "defi2", "defi3"]
  },
  {
    id: "3",
    title: "NFT Marketplaces",
    description: "Where to buy, sell, and discover digital collectibles",
    createdAt: "2025-02-18T15:45:00Z",
    updatedAt: "2025-04-28T16:30:00Z",
    createdBy: "curator1",
    isPinned: false,
    coverImage: "/placeholder.svg",
    tags: ["nft", "marketplace", "collectibles"],
    productIds: ["nft1", "nft2", "nft3", "nft4"]
  },
  {
    id: "4",
    title: "Dev Tools for Web3",
    description: "Essential developer tools for building on blockchain",
    createdAt: "2025-01-05T11:10:00Z",
    updatedAt: "2025-05-12T09:40:00Z",
    createdBy: "admin",
    isPinned: true,
    coverImage: "/placeholder.svg",
    tags: ["development", "tools", "blockchain"],
    productIds: ["dev1", "dev2", "dev3", "dev4", "dev5", "dev6"]
  }
];

export function AdminListManager() {
  const [lists, setLists] = useState<CuratedList[]>(mockLists);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleTogglePin = (id: string) => {
    setLists(lists.map(list => 
      list.id === id ? { ...list, isPinned: !list.isPinned } : list
    ));
    
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
    setLists(lists.filter(list => list.id !== id));
    
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
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Curated Lists</h2>
        <Button onClick={() => navigate('/curated-lists/create')}>
          <Plus className="w-4 h-4 mr-1" />
          New List
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {lists.map((list) => (
          <Card key={list.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div 
                  className="w-full md:w-40 h-24 md:h-auto bg-cover bg-center" 
                  style={{ backgroundImage: `url(${list.coverImage})` }}
                />
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
    </div>
  );
}
