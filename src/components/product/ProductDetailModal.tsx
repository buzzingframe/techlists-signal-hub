
import { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useProductModal } from "@/contexts/ProductModalContext";
import { ProductMetaOverview } from "@/components/product/ProductMetaOverview";
import { ProductOverviewTab } from "@/components/product/ProductOverviewTab";
import { ProductPricingTab } from "@/components/product/ProductPricingTab";
import { ProductAlternativesTab } from "@/components/product/ProductAlternativesTab";
import { ProductEditorialReview } from "@/components/product/ProductEditorialReview";
import { ReviewSection } from "@/components/ReviewSection";
import { ReviewModal } from "@/components/ReviewModal";
import { useProductDetail } from "@/hooks/useProductDetail";

function ModalLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-20" />
        ))}
      </div>
    </div>
  );
}

export function ProductDetailModal() {
  const { isModalOpen, productData, closeProductModal } = useProductModal();
  const navigate = useNavigate();
  
  // Use the productDetail hook to fetch complete data when the modal is open
  const { product, isLoading, handleReviewSubmitted } = useProductDetail(
    productData?.id,
    { enabled: isModalOpen && !!productData?.id }
  );
  
  // Memoize the display product to prevent unnecessary re-renders
  const displayProduct = useMemo(() => 
    product || productData, 
    [product, productData]
  );
  
  const handleOpenFullPage = () => {
    if (displayProduct) {
      navigate(`/product/${displayProduct.id}`);
      closeProductModal();
    }
  };

  // If the modal is not open, don't render anything
  if (!isModalOpen) {
    return null;
  }

  return (
    <Dialog 
      open={isModalOpen} 
      onOpenChange={(open) => !open && closeProductModal()}
    >
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto p-0"
        aria-describedby="product-modal-description"
      >
        <div className="flex flex-col">
          {/* Header */}
          <DialogHeader className="p-4 md:p-6 pb-2 border-b flex flex-row items-center justify-between bg-background sticky top-0 z-10">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {displayProduct ? (
                <>
                  <div className="text-2xl md:text-3xl flex-shrink-0">{displayProduct.logo}</div>
                  <div className="min-w-0">
                    <DialogTitle className="text-lg md:text-xl font-semibold truncate">
                      {displayProduct.name}
                    </DialogTitle>
                    <DialogDescription 
                      id="product-modal-description"
                      className="text-muted-foreground truncate"
                    >
                      {displayProduct.category}
                    </DialogDescription>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded" />
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleOpenFullPage}
              className="flex items-center gap-1 ml-2 flex-shrink-0"
              disabled={!displayProduct}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Full Page</span>
            </Button>
          </DialogHeader>
          
          {/* Content */}
          {isLoading ? (
            <div className="p-4 md:p-6">
              <ModalLoadingSkeleton />
            </div>
          ) : displayProduct ? (
            <>
              {/* Product Meta Overview */}
              <div className="px-4 md:px-6 py-4 border-b">
                <ProductMetaOverview product={displayProduct} />
              </div>
              
              {/* Tabs - Only render if we have the complete product data */}
              {product && (
                <div className="p-4 md:p-6">
                  <Tabs defaultValue="overview" className="w-full">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                      <TabsList className="grid w-full grid-cols-4 sm:w-auto">
                        <TabsTrigger value="overview" className="text-xs sm:text-sm">
                          Overview
                        </TabsTrigger>
                        <TabsTrigger value="pricing" className="text-xs sm:text-sm">
                          Pricing
                        </TabsTrigger>
                        <TabsTrigger value="reviews" className="text-xs sm:text-sm">
                          Reviews
                        </TabsTrigger>
                        <TabsTrigger value="alternatives" className="text-xs sm:text-sm">
                          Alternatives
                        </TabsTrigger>
                      </TabsList>
                      
                      {/* Review Button */}
                      <div className="flex-shrink-0">
                        <ReviewModal 
                          productId={product.id} 
                          productName={product.name}
                          onReviewSubmitted={handleReviewSubmitted}
                        />
                      </div>
                    </div>
                    
                    <TabsContent value="overview" className="mt-6">
                      {product.features && product.media && (
                        <ProductOverviewTab 
                          features={product.features} 
                          media={product.media} 
                        />
                      )}
                    </TabsContent>
                    
                    <TabsContent value="pricing" className="mt-6">
                      {product.pricing && (
                        <ProductPricingTab pricing={product.pricing} />
                      )}
                    </TabsContent>
                    
                    <TabsContent value="reviews" className="mt-6">
                      {product.reviews && (
                        <ReviewSection reviews={product.reviews} />
                      )}
                    </TabsContent>
                    
                    <TabsContent value="alternatives" className="mt-6">
                      {product.alternatives && (
                        <ProductAlternativesTab alternatives={product.alternatives} />
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              {/* Admin Review */}
              {product?.adminReview && (
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <ProductEditorialReview adminReview={product.adminReview} />
                </div>
              )}
            </>
          ) : (
            <div className="p-4 md:p-6 text-center">
              <p className="text-muted-foreground">Product not found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
