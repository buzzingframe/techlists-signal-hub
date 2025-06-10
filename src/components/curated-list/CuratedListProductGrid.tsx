
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Product } from "@/types/product";

interface CuratedListProductGridProps {
  products: Product[];
}

export function CuratedListProductGrid({ products }: CuratedListProductGridProps) {
  const [sortBy, setSortBy] = useState("signalScore");

  // Sort products based on selected sort option
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "signalScore") {
      return b.signalScore - a.signalScore;
    } else if (sortBy === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div className="content-spacing">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Products ({products.length})</h2>
        <div className="flex items-center">
          <span className="mr-2 text-sm text-muted-foreground">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="signalScore">Signal Score</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-standard">
        {sortedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            className="h-full" 
          />
        ))}
      </div>
    </div>
  );
}
