
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CuratedListHeaderProps {
  isAdmin: boolean;
}

export function CuratedListHeader({ isAdmin }: CuratedListHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Curated Lists</h1>
        <p className="text-muted-foreground">
          Discover handpicked collections of the best tools for specific use cases
        </p>
      </div>
      
      {isAdmin && (
        <Button asChild>
          <Link to="/curated-lists/create">Create New List</Link>
        </Button>
      )}
    </div>
  );
}
