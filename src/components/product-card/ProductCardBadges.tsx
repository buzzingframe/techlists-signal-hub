
import { Badge } from "@/components/ui/badge";

interface ProductCardBadgesProps {
  badges: string[];
}

export function ProductCardBadges({ badges }: ProductCardBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {badges.map((badge, index) => (
        <Badge key={index} variant="outline" className="text-xs">
          {badge}
        </Badge>
      ))}
    </div>
  );
}
