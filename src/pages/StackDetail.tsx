
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useStacks } from "@/hooks/useStacks";
import { UserStack } from "@/types/user";
import { Product } from "@/types/product";
import { Eye, EyeOff, Share, Layers, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

// Demo products for testing
const DEMO_PRODUCTS: { [key: string]: Product } = {
  "product-1": {
    id: "product-1",
    name: "Chain Explorer",
    category: "Analytics",
    signalScore: 98,
    logo: "🔍",
    price: "Free",
    badges: ["Open Source", "Self-hosted"],
    description: "A comprehensive blockchain explorer with powerful analytics",
  },
  "product-2": {
    id: "product-2",
    name: "Wallet Pro",
    category: "Wallets",
    signalScore: 87,
    logo: "👛",
    price: "$",
    badges: ["Mobile", "Multi-chain"],
    description: "Secure and easy-to-use wallet for all your crypto assets",
  },
  "product-3": {
    id: "product-3",
    name: "NFT Creator",
    category: "NFT",
    signalScore: 92,
    logo: "🎨",
    price: "Freemium",
    badges: ["AI-Powered", "No-Code"],
    description: "Create, mint, and sell NFTs without any coding knowledge",
  },
};

export default function StackDetail() {
  const { stackId } = useParams();
  const { stacks, toggleStackVisibility } = useStacks();
  const { toast } = useToast();
  const [stack, setStack] = useState<UserStack | null>(null);
  const [stackProducts, setStackProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real implementation, this would fetch the stack from Supabase
    const foundStack = stacks.find((s) => s.id === stackId);
    setStack(foundStack || null);
    
    if (foundStack) {
      // In a real implementation, this would fetch the products from Supabase
      const products = foundStack.productIds.map((id) => DEMO_PRODUCTS[id]).filter(Boolean);
      setStackProducts(products);
    }
    
    setIsLoading(false);
  }, [stackId, stacks]);
  
  const handleShareStack = () => {
    // In a real implementation, this would generate a share link
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Stack link copied to clipboard",
    });
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-64 bg-muted rounded w-full"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!stack) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-full py-12">
            <Layers className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Stack not found</h1>
            <p className="text-muted-foreground mb-6">
              The stack you're looking for doesn't exist or is private.
            </p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Stack Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={stack.isPublic ? "secondary" : "outline"} className="text-xs">
                    {stack.isPublic ? "Public Stack" : "Private Stack"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Created {format(new Date(stack.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{stack.title}</h1>
                
                {stack.description && (
                  <p className="text-lg text-muted-foreground max-w-3xl mb-4">
                    {stack.description}
                  </p>
                )}
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm">
                    <User className="h-4 w-4" />
                    <span>Created by You</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stackProducts.length} {stackProducts.length === 1 ? "product" : "products"}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => toggleStackVisibility(stack.id)}>
                  {stack.isPublic ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-1" />
                      Make Private
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-1" />
                      Make Public
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShareStack}>
                  <Share className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stack Products */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-6">Products in this Stack</h2>
          
          {stackProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stackProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-muted/30 border rounded-lg p-8 text-center">
              <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No products in this stack yet</h3>
              <p className="text-muted-foreground mb-4">
                Start adding products to build your stack.
              </p>
              <Link to="/">
                <Button>Browse Products</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
