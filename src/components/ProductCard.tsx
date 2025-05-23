
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SignalScoreBadge } from "./SignalScoreBadge";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    signalScore: number;
    logo: string;
    price: "Free" | "$" | "$$";
    badges: string[];
    description: string;
  };
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const getPriceColor = (price: string) => {
    switch (price) {
      case "Free": return "text-green-600 bg-green-50 dark:bg-green-900/20";
      case "$": return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
      case "$$": return "text-purple-600 bg-purple-50 dark:bg-purple-900/20";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  return (
    <div className={cn(
      "group relative bg-card rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden",
      className
    )}>
      {/* Product Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">{product.logo}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <Badge variant="secondary" className="text-xs mt-1">
                {product.category}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <SignalScoreBadge score={product.signalScore} size="sm" />
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.badges.map((badge, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {badge}
            </Badge>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <Badge className={cn("text-xs font-medium", getPriceColor(product.price))}>
            {product.price}
          </Badge>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
