
import { Button } from "@/components/ui/button";
import { Edit, MoveVertical, Plus, Trash2, Pin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CuratedList } from "@/types/product";

interface CuratedListAdminControlsProps {
  list: CuratedList;
  isAdmin: boolean;
}

export function CuratedListAdminControls({ list, isAdmin }: CuratedListAdminControlsProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!isAdmin) {
    return null;
  }

  const handleEditDetails = () => {
    navigate(`/curated-lists/${list.id}/edit`);
  };

  const handleAddProducts = () => {
    navigate(`/curated-lists/${list.id}/products`);
  };

  const handleReorder = () => {
    toast({
      title: "Reorder functionality",
      description: "Product reordering will be available soon.",
    });
  };

  const handleTogglePin = () => {
    // TODO: Implement actual pin/unpin functionality with Supabase
    toast({
      title: list.isPinned ? "List unpinned" : "List pinned",
      description: list.isPinned 
        ? `"${list.title}" has been removed from featured lists` 
        : `"${list.title}" is now featured on the homepage`
    });
  };

  const handleDelete = () => {
    // TODO: Implement actual delete functionality with confirmation dialog
    if (window.confirm(`Are you sure you want to delete "${list.title}"? This action cannot be undone.`)) {
      toast({
        title: "List deleted",
        description: `"${list.title}" has been deleted`,
        variant: "destructive"
      });
      navigate('/curated-lists');
    }
  };

  return (
    <div className="bg-muted/50 border rounded-lg p-4 mb-8">
      <h2 className="font-medium mb-3">Admin Controls</h2>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleEditDetails}>
          <Edit className="w-4 h-4" /> Edit Details
        </Button>
        <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleAddProducts}>
          <Plus className="w-4 h-4" /> Add Products
        </Button>
        <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleReorder}>
          <MoveVertical className="w-4 h-4" /> Reorder
        </Button>
        <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={handleTogglePin}>
          <Pin className="w-4 h-4" />
          {list.isPinned ? "Unpin" : "Pin to Homepage"}
        </Button>
        <Button size="sm" variant="destructive" className="flex items-center gap-1" onClick={handleDelete}>
          <Trash2 className="w-4 h-4" /> Delete List
        </Button>
      </div>
    </div>
  );
}
