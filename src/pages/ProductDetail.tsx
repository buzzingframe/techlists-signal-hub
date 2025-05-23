
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductMetaOverview } from "@/components/product/ProductMetaOverview";
import { ProductEditorialReview } from "@/components/product/ProductEditorialReview";
import { ProductTabContent } from "@/components/product/ProductTabContent";
import { useProductDetail } from "@/hooks/useProductDetail";

export default function ProductDetail() {
  const { productId } = useParams();
  const { product, isSaved, handleSave, handleReviewSubmitted, isLoading } = useProductDetail(productId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading product details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Product not found</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
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
      </main>
      
      <Footer />
    </div>
  );
}
