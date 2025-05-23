
import { CuratedList } from "@/types/product";
import { CuratedListCard } from "./CuratedListCard";

interface CuratedListGridProps {
  lists: CuratedList[];
}

export function CuratedListGrid({ lists }: CuratedListGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lists.map((list) => (
        <CuratedListCard key={list.id} list={list} />
      ))}
    </div>
  );
}
