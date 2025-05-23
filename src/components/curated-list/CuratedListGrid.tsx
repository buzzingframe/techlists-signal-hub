
import { CuratedList } from "@/types/product";
import { CuratedListCard } from "./CuratedListCard";

interface CuratedListGridProps {
  lists: CuratedList[];
}

export function CuratedListGrid({ lists }: CuratedListGridProps) {
  if (lists.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">No curated lists available</h3>
        <p className="mt-2 text-muted-foreground">Check back later for new lists.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {lists.map((list, index) => (
        <div 
          key={list.id} 
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CuratedListCard list={list} />
        </div>
      ))}
    </div>
  );
}
