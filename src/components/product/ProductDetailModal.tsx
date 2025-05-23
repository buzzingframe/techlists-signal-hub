
import { Dialog, DialogContent } from "@/components/ui/dialog";
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

export function ProductDetailModal() {
  const { isModalOpen, productData, closeProductModal } = useProductModal();
  const navigate = useNavigate();
  
  const handleOpenFullPage = () => {
    if (productData) {
      navigate(`/product/${productData.id}`);
      closeProductModal();
    }
  };

  if (!productData) {
    return null;
  }

  const handleReviewSubmitted = () => {
    // In a real app, you would refresh the reviews data here
    console.log("Review submitted successfully");
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeProductModal()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="flex flex-col">
          {/* Header */}
          <div className="p-6 pb-2 border-b flex items-center justify-between bg-background sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{productData.logo}</div>
              <div>
                <h2 className="text-xl font-semibold">{productData.name}</h2>
                <p className="text-muted-foreground">{productData.category}</p>
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
          </div>
          
          {/* Product Meta Overview */}
          <div className="px-6 py-4 border-b">
            <ProductMetaOverview product={productData} />
          </div>
          
          {/* Tabs */}
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
                  productId={productData.id} 
                  productName={productData.name}
                  onReviewSubmitted={handleReviewSubmitted}
                />
              </div>
              
              <TabsContent value="overview">
                {productData.features && productData.media && (
                  <ProductOverviewTab 
                    features={productData.features} 
                    media={productData.media} 
                  />
                )}
              </TabsContent>
              
              <TabsContent value="pricing">
                {productData.pricing && (
                  <ProductPricingTab pricing={productData.pricing} />
                )}
              </TabsContent>
              
              <TabsContent value="reviews">
                {productData.reviews && (
                  <ReviewSection reviews={productData.reviews} />
                )}
              </TabsContent>
              
              <TabsContent value="alternatives">
                {productData.alternatives && (
                  <ProductAlternativesTab alternatives={productData.alternatives} />
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Admin Review */}
          {productData.adminReview && (
            <div className="px-6 pb-6">
              <ProductEditorialReview adminReview={productData.adminReview} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
