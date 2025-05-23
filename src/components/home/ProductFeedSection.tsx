
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useProducts } from "@/hooks/useProducts";

export function ProductFeedSection() {
  const [sortBy, setSortBy] = useState("signalScore");
  const { products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Loading products...</h2>
            <p className="mt-2 text-muted-foreground">Please wait while we load the latest products.</p>
          </div>
        </div>
      </section>
    );
  }

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
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest Products</h2>
            <p className="text-muted-foreground">
              Discover the newest and most promising Web3 tools
            </p>
          </div>
          
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.slice(0, 9).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              className="h-full" 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
