
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductFeedSection } from "@/components/home/ProductFeedSection";
import { NewsPreviewStrip } from "@/components/NewsPreviewStrip";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Trending Feed */}
      <ProductFeedSection />

      {/* News Preview Strip */}
      <NewsPreviewStrip />

      <Footer />
    </div>
  );
};

export default Index;
