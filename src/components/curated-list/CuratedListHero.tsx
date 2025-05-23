
import { Badge } from "@/components/ui/badge";
import { Calendar, Pin } from "lucide-react";
import { CuratedList } from "@/types/product";

interface CuratedListHeroProps {
  list: CuratedList;
  formatDate: (dateString: string) => string;
}

export function CuratedListHero({ list, formatDate }: CuratedListHeroProps) {
  if (list.coverImage) {
    return (
      <div className="relative h-60 md:h-80 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30">
          <img 
            src={list.coverImage}
            alt={list.title}
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold">{list.title}</h1>
            <div className="flex items-center mt-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Updated {formatDate(list.updatedAt)}</span>
              {list.isPinned && <Pin className="h-4 w-4 ml-4 mr-2 text-yellow-400" />}
              {list.isPinned && <span>Pinned</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold">{list.title}</h1>
        {list.isPinned && (
          <Badge variant="outline" className="border-yellow-400 text-yellow-600 flex items-center gap-1">
            <Pin className="h-3.5 w-3.5" /> Pinned
          </Badge>
        )}
      </div>
      <div className="flex items-center mt-2 text-muted-foreground">
        <Calendar className="h-4 w-4 mr-2" />
        <span>Updated {formatDate(list.updatedAt)}</span>
      </div>
    </div>
  );
}
