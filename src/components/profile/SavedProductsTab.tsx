
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Layers } from "lucide-react";

interface SavedProductsTabProps {
  products: Product[];
  sortOption: string;
  onSortChange: (option: string) => void;
  onRemoveProduct: (productId: string) => void;
}

export function SavedProductsTab({
  products,
  sortOption,
  onSortChange,
  onRemoveProduct,
}: SavedProductsTabProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Saved Products</h2>
        <Select value={sortOption} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Saved</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
            <SelectItem value="score">Highest Score</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} className="h-full" />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                >
                  <Layers className="h-4 w-4" />
                  <span className="sr-only">Add to Stack</span>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-destructive"
                  onClick={() => onRemoveProduct(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bookmark className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No saved products yet</h3>
            <CardDescription className="text-center">
              Start exploring and save products you're interested in for easy
              access later.
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Helper Bookmark icon for empty state
function Bookmark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
    </svg>
  );
}
