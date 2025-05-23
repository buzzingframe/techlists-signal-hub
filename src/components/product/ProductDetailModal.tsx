
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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

export function ProductDetailModal() {
  const { isModalOpen, productData, closeProductModal } = useProductModal();
  const navigate = useNavigate();
  
  // Use the productDetail hook to fetch complete data when the modal is open
  const { product, isLoading, handleReviewSubmitted } = useProductDetail(
    productData?.id,
    { enabled: isModalOpen && !!productData?.id }
  );
  
  // When loading, show a loading state
  if (isLoading && isModalOpen) {
    return (
      <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeProductModal()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Loading product details...</DialogTitle>
            <DialogDescription>Please wait while we load the product information.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  
  // Use the complete product data if available, otherwise fall back to the basic data
  const displayProduct = product || productData;
  
  const handleOpenFullPage = () => {
    if (displayProduct) {
      navigate(`/product/${displayProduct.id}`);
      closeProductModal();
    }
  };

  if (!displayProduct) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeProductModal()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="flex flex-col">
          {/* Header */}
          <DialogHeader className="p-6 pb-2 border-b flex items-center justify-between bg-background sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{displayProduct.logo}</div>
              <div>
                <DialogTitle className="text-xl font-semibold">{displayProduct.name}</DialogTitle>
                <DialogDescription className="text-muted-foreground">{displayProduct.category}</DialogDescription>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleOpenFullPage}
              className="flex items-center gap-1"
            >
              <ExternalLink className="w-4 h-4" />
              Full Page
            </Button>
          </DialogHeader>
          
          {/* Product Meta Overview */}
          <div className="px-6 py-4 border-b">
            <ProductMetaOverview product={displayProduct} />
          </div>
          
          {/* Tabs - Only render if we have the complete product data */}
          {product && (
            <div className="p-6">
              <Tabs defaultValue="overview" className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
                  </TabsList>
                  
                  {/* Review Button */}
                  <ReviewModal 
                    productId={product.id} 
                    productName={product.name}
                    onReviewSubmitted={handleReviewSubmitted}
                  />
                </div>
                
                <TabsContent value="overview">
                  {product.features && product.media && (
                    <ProductOverviewTab 
                      features={product.features} 
                      media={product.media} 
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="pricing">
                  {product.pricing && (
                    <ProductPricingTab pricing={product.pricing} />
                  )}
                </TabsContent>
                
                <TabsContent value="reviews">
                  {product.reviews && (
                    <ReviewSection reviews={product.reviews} />
                  )}
                </TabsContent>
                
                <TabsContent value="alternatives">
                  {product.alternatives && (
                    <ProductAlternativesTab alternatives={product.alternatives} />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          {/* Admin Review */}
          {product?.adminReview && (
            <div className="px-6 pb-6">
              <ProductEditorialReview adminReview={product.adminReview} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
