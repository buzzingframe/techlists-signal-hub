
import { useParams } from "react-router-dom";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductMetaOverview } from "@/components/product/ProductMetaOverview";
import { ProductEditorialReview } from "@/components/product/ProductEditorialReview";
import { ProductTabContent } from "@/components/product/ProductTabContent";
import { useProductDetail } from "@/hooks/useProductDetail";
import { ProductErrorBoundary } from "@/components/product/ProductErrorBoundary";
import { ProductLayout } from "@/components/product/ProductLayout";

export default function ProductDetail() {
  const { productId } = useParams();
  const { product, isSaved, handleSave, handleReviewSubmitted, isLoading } = useProductDetail(productId);

  return (
    <ProductErrorBoundary isLoading={isLoading} hasError={!product && !isLoading}>
      <ProductLayout>
        {product && (
          <>
            {/* Hero Section */}
            <ProductHero 
              product={product} 
              isSaved={isSaved} 
              onSaveToggle={handleSave} 
            />
            
            {/* Meta Overview */}
            <ProductMetaOverview product={product} />
            
            {/* Main Content Tabs */}
            <ProductTabContent 
              product={product} 
              onReviewSubmitted={handleReviewSubmitted} 
            />
            
            {/* Admin Review */}
            <ProductEditorialReview adminReview={product.adminReview} />
          </>
        )}
      </ProductLayout>
    </ProductErrorBoundary>
  );
}
