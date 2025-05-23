
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewSection } from "@/components/ReviewSection";
import { ReviewModal } from "@/components/ReviewModal";
import { ProductOverviewTab } from "@/components/product/ProductOverviewTab";
import { ProductPricingTab } from "@/components/product/ProductPricingTab";
import { ProductAlternativesTab } from "@/components/product/ProductAlternativesTab";
import { Product } from "@/types/product";

interface ProductTabContentProps {
  product: Product;
  onReviewSubmitted: () => void;
}

export function ProductTabContent({ product, onReviewSubmitted }: ProductTabContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
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
            onReviewSubmitted={onReviewSubmitted}
          />
        </div>
        
        <TabsContent value="overview">
          <ProductOverviewTab 
            features={product.features || []} 
            media={product.media || []} 
          />
        </TabsContent>
        
        <TabsContent value="pricing">
          <ProductPricingTab pricing={product.pricing || {}} />
        </TabsContent>
        
        <TabsContent value="reviews">
          <ReviewSection reviews={product.reviews || []} />
        </TabsContent>
        
        <TabsContent value="alternatives">
          <ProductAlternativesTab alternatives={product.alternatives || []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
