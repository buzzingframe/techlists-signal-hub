
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/loading/ProductGridSkeleton";
import { NetworkError } from "@/components/error/NetworkError";
import { CategoryNavigation } from "@/components/home/CategoryNavigation";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useProducts } from "@/hooks/useProducts";
import { useProductsFilter } from "@/hooks/useProductsFilter";

const PRODUCTS_PER_PAGE = 9;

export function ProductFeedSection() {
  const [currentPage, setCurrentPage] = useState(1);
  // Show all products including pending ones for now to address the "no products found" issue
  const { products, isLoading, error, refetch, isOffline } = useProducts(true);
  
  const {
    categories,
    selectedCategory,
    sortBy,
    sortedProducts,
    filteredCount,
    totalProducts,
    handleCategoryChange,
    handleSortChange
  } = useProductsFilter(products);

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const displayProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filtering changes
  const handleCategoryChangeWithReset = (category: string) => {
    handleCategoryChange(category);
    setCurrentPage(1);
  };

  const handleSortChangeWithReset = (newSortBy: string) => {
    handleSortChange(newSortBy);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of section when page changes
    document.querySelector('[data-product-feed]')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  if (error || isOffline) {
    return (
      <section className="py-16 bg-muted/30" data-product-feed>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Latest Products</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Discover the newest and most promising Web3 tools
              </p>
            </div>
          </div>
          
          <NetworkError 
            isOffline={isOffline}
            onRetry={refetch}
            message={error ? (error as Error).message : undefined}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16 bg-muted/30" data-product-feed>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Latest Products</h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Discover the newest and most promising Web3 tools 
              {selectedCategory === "all" 
                ? `(${totalProducts} total)` 
                : `(${filteredCount} in ${selectedCategory})`
              }
            </p>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
            <Select value={sortBy} onValueChange={handleSortChangeWithReset} disabled={isLoading}>
              <SelectTrigger className="w-[140px] sm:w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="signalScore">Signal Score</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Navigation */}
        {!isLoading && categories.length > 0 && (
          <CategoryNavigation
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChangeWithReset}
            isLoading={isLoading}
          />
        )}
        
        {isLoading ? (
          <ProductGridSkeleton count={9} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {displayProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  className="h-full animate-fade-in" 
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) handlePageChange(currentPage - 1);
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {getPageNumbers().map((pageNumber) => (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNumber);
                          }}
                          isActive={currentPage === pageNumber}
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) handlePageChange(currentPage + 1);
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}

        {/* Enhanced Empty States */}
        {!isLoading && displayProducts.length === 0 && (
          <div className="text-center py-12">
            {selectedCategory === "all" ? (
              <>
                <h3 className="text-lg font-semibold">No products available</h3>
                <p className="mt-2 text-muted-foreground">
                  Products are currently being reviewed. Check back soon for new additions!
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold">No products found in {selectedCategory}</h3>
                <p className="mt-2 text-muted-foreground">
                  Try selecting a different category or view all products.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
