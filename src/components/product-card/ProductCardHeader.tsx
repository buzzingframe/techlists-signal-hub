
import { Badge } from "@/components/ui/badge";

interface ProductCardHeaderProps {
  logo: string;
  name: string;
  category: string;
  signalScore: number;
}

export function ProductCardHeader({ logo, name, category, signalScore }: ProductCardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="text-2xl flex-shrink-0">{logo}</div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-base mb-1 truncate">{name}</h3>
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-1 text-sm text-muted-foreground ml-2 flex-shrink-0">
        <span className="font-medium">{signalScore}</span>
        <span className="text-xs">signal</span>
      </div>
    </div>
  );
}
