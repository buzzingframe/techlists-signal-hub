
import { Button } from "@/components/ui/button";
import { Edit, MoveVertical, Plus, Trash2, Pin } from "lucide-react";
import { CuratedList } from "@/types/product";

interface CuratedListAdminControlsProps {
  list: CuratedList;
  isAdmin: boolean;
}

export function CuratedListAdminControls({ list, isAdmin }: CuratedListAdminControlsProps) {
  if (!isAdmin) {
    return null;
  }

  return (
    <div className="bg-muted/50 border rounded-lg p-4 mb-8">
      <h2 className="font-medium mb-3">Admin Controls</h2>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Edit className="w-4 h-4" /> Edit Details
        </Button>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add Products
        </Button>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          <MoveVertical className="w-4 h-4" /> Reorder
        </Button>
        <Button size="sm" variant="outline" className="flex items-center gap-1">
          {list.isPinned ? <Pin className="w-4 h-4" /> : <Pin className="w-4 h-4" />} 
          {list.isPinned ? "Unpin" : "Pin to Homepage"}
        </Button>
        <Button size="sm" variant="destructive" className="flex items-center gap-1">
          <Trash2 className="w-4 h-4" /> Delete List
        </Button>
      </div>
    </div>
  );
}
