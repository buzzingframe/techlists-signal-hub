
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignalScoreBadge } from "@/components/SignalScoreBadge";
import { ExternalLink, Save, BarChart } from "lucide-react";
import { Product } from "@/types/product";

interface ProductHeroProps {
  product: Product;
  isSaved: boolean;
  onSaveToggle: () => void;
}

export function ProductHero({ product, isSaved, onSaveToggle }: ProductHeroProps) {
  return (
    <div className="bg-gradient-to-b from-muted/50 to-background pt-6 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Product Logo */}
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center text-4xl md:text-5xl">
            {product.logo}
          </div>
          
          {/* Product Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              <Badge variant="secondary" className="w-fit">
                {product.category}
              </Badge>
            </div>
            
            <p className="text-lg text-muted-foreground mb-4">
              {product.editorialSummary}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {product.badges?.map((badge, index) => (
                <Badge key={index} variant="outline">
                  {badge}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {product.website && (
                <a 
                  href={product.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {product.website}
                  <ExternalLink className="ml-1 w-3 h-3" />
                </a>
              )}
            </div>
          </div>
          
          {/* Signal Score and Actions */}
          <div className="flex flex-row md:flex-col items-center gap-4 mt-2">
            <div className="flex flex-col items-center">
              <SignalScoreBadge score={product.signalScore} size="lg" />
              <span className="text-xs text-muted-foreground mt-1">Signal Score</span>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={isSaved ? "default" : "outline"}
                onClick={onSaveToggle}
                className="h-10 px-4"
              >
                <Save className="mr-1 h-4 w-4" />
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" className="h-10 px-4">
                <BarChart className="mr-1 h-4 w-4" />
                Compare
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
