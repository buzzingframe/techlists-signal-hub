
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ProductCard";
import { productData } from "./productData";

export function ProductFeedSection() {
  const [activeTab, setActiveTab] = useState("trending");

  const filteredProducts = () => {
    switch (activeTab) {
      case "trending":
        return productData.slice(0, 6);
      case "top-score":
        return [...productData].sort((a, b) => b.signalScore - a.signalScore);
      case "free":
        return productData.filter(p => p.price === "Free");
      case "admin-picks":
        return productData.filter(p => p.signalScore > 8.5);
      default:
        return productData;
    }
  };

  return (
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
  );
}
