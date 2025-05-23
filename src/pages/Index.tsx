
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductFeedSection } from "@/components/home/ProductFeedSection";
import { NewsPreviewStrip } from "@/components/NewsPreviewStrip";
import { ProductModalProvider } from "@/contexts/ProductModalContext";
import { ProductDetailModal } from "@/components/product/ProductDetailModal";

const Index = () => {
  return (
    <ProductModalProvider>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <HeroSection />

        {/* Trending Feed */}
        <ProductFeedSection />

        {/* News Preview Strip */}
        <NewsPreviewStrip />

        <Footer />
        
        {/* Product Detail Modal */}
        <ProductDetailModal />
      </div>
    </ProductModalProvider>
  );
};

export default Index;
