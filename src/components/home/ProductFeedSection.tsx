
import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/loading/ProductGridSkeleton";
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
  const { products, isLoading, error } = useProducts();

  // Memoize sorted products to prevent unnecessary re-renders
  const sortedProducts = useMemo(() => {
    if (!products.length) return [];
    
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "signalScore":
          return b.signalScore - a.signalScore;
        case "alphabetical":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  }, [products, sortBy]);

  const displayProducts = sortedProducts.slice(0, 9);

  if (error) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-destructive">Failed to load products</h2>
            <p className="mt-2 text-muted-foreground">Please try refreshing the page.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Latest Products</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Discover the newest and most promising Web3 tools
            </p>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy} disabled={isLoading}>
              <SelectTrigger className="w-[140px] sm:w-[180px]">
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
        
        {isLoading ? (
          <ProductGridSkeleton count={9} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {displayProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                className="h-full animate-fade-in" 
              />
            ))}
          </div>
        )}

        {!isLoading && displayProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="mt-2 text-muted-foreground">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
