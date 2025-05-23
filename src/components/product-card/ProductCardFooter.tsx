
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardFooterProps {
  price: "Free" | "$" | "$$" | "Freemium";
  onAddToStack: () => void;
  onViewDetails?: () => void;
}

export function ProductCardFooter({ price, onAddToStack, onViewDetails }: ProductCardFooterProps) {
  const getPriceColor = (price: string) => {
    switch (price) {
      case "Free": return "text-green-600 bg-green-50 dark:bg-green-900/20";
      case "$": return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
      case "$$": return "text-purple-600 bg-purple-50 dark:bg-purple-900/20";
      case "Freemium": return "text-teal-600 bg-teal-50 dark:bg-teal-900/20";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <Badge className={cn("text-xs font-medium", getPriceColor(price))}>
        {price}
      </Badge>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
          onClick={onAddToStack}
        >
          <Layers className="w-4 h-4 mr-1" />
          Add to Stack
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}
