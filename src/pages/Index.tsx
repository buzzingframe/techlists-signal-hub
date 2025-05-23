import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { NewsPreviewStrip } from "@/components/NewsPreviewStrip";
import { useNavigate } from "react-router-dom";
import { ProductModalProvider } from "@/contexts/ProductModalContext";
import { ProductDetailModal } from "@/components/product/ProductDetailModal";

const Index = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const navigate = useNavigate();

  // Sample product data
  const products = [
    {
      id: "1",
      name: "MetaMask",
      category: "Wallet",
      signalScore: 8.7,
      logo: "🦊",
      price: "Free" as const,
      badges: ["Browser Extension", "Mobile App"],
      description: "The leading Ethereum wallet for Web3 transactions and DApp interactions."
    },
    {
      id: "2",
      name: "Uniswap",
      category: "DEX",
      signalScore: 9.2,
      logo: "🦄",
      price: "$" as const,
      badges: ["Decentralized", "AMM"],
      description: "The largest decentralized exchange protocol built on Ethereum."
    },
    {
      id: "3",
      name: "OpenSea",
      category: "NFT Marketplace",
      signalScore: 7.4,
      logo: "🌊",
      price: "$$" as const,
      badges: ["NFTs", "Marketplace"],
      description: "The world's first and largest NFT marketplace for digital collectibles."
    },
    {
      id: "4",
      name: "Chainlink",
      category: "Oracle",
      signalScore: 8.9,
      logo: "🔗",
      price: "Free" as const,
      badges: ["Oracle Network", "Data Feeds"],
      description: "Decentralized oracle network providing real-world data to smart contracts."
    },
    {
      id: "5",
      name: "IPFS",
      category: "Storage",
      signalScore: 8.1,
      logo: "📁",
      price: "Free" as const,
      badges: ["Decentralized Storage", "Open Source"],
      description: "Distributed system for storing and accessing files, websites, and data."
    },
    {
      id: "6",
      name: "Polygon",
      category: "Layer 2",
      signalScore: 8.5,
      logo: "🔷",
      price: "$" as const,
      badges: ["Scaling Solution", "Low Fees"],
      description: "Ethereum scaling solution providing faster and cheaper transactions."
    }
  ];

  const filteredProducts = () => {
    switch (activeTab) {
      case "trending":
        return products.slice(0, 6);
      case "top-score":
        return [...products].sort((a, b) => b.signalScore - a.signalScore);
      case "free":
        return products.filter(p => p.price === "Free");
      case "admin-picks":
        return products.filter(p => p.signalScore > 8.5);
      default:
        return products;
    }
  };

  // Function to navigate to product detail page
  const handleViewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <ProductModalProvider>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center overflow-hidden isolate">
          {/* Background Effects (with isolation) */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 -z-10" />
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl -z-10" />
          
          <div className="container mx-auto relative">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                🚀 Now featuring 500+ Web3 tools
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                No Hype.
                <br />
                Just Honest Web3 Tools.
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover, compare, and choose the best Web3 tools based on real user feedback, 
                expert reviews, and transparency metrics.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
                >
                  Explore Today's Signals
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  Learn More
                </Button>
              </div>
              
              <div className="mt-12 flex justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>500+ Tools Reviewed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span>Real-time Signals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span>Community Driven</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trending Feed */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trending Web3 Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the most popular and highest-rated tools in the Web3 ecosystem
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="top-score">Top Score</TabsTrigger>
                <TabsTrigger value="free">Free Tools</TabsTrigger>
                <TabsTrigger value="admin-picks">Editor's Choice</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts().map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                View All Tools
              </Button>
            </div>
          </div>
        </section>

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
