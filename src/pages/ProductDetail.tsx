
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignalScoreBadge } from "@/components/SignalScoreBadge";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductMediaCarousel } from "@/components/ProductMediaCarousel";
import { PricingTable } from "@/components/PricingTable";
import { FeatureGrid } from "@/components/FeatureGrid";
import { ReviewSection } from "@/components/ReviewSection";
import { ExternalLink, Save, Star, BarChart, MessageSquare, FileText } from "lucide-react";

// Mock data for the product
const productData = {
  id: "web3auth",
  name: "Web3Auth",
  category: "Authentication",
  signalScore: 8.4,
  logo: "📱",
  price: "Freemium",
  description: "Secure authentication for Web3 applications with social login support.",
  badges: ["Social Login", "Multi-Chain", "SDK"],
  website: "https://web3auth.io",
  editorialSummary: "The most reliable auth system for modern Web3 projects",
  useCase: ["Solo Devs", "Scaling Teams", "Enterprise"],
  reviewerPersona: "Verified Dev",
  pricing: {
    free: {
      name: "Free",
      price: "$0",
      features: ["Up to 100 MAU", "Standard integrations", "Community support"]
    },
    pro: {
      name: "Pro",
      price: "$99/mo",
      features: ["Up to 10k MAU", "Priority support", "Custom branding", "Advanced analytics"]
    },
    enterprise: {
      name: "Enterprise",
      price: "Custom",
      features: ["Unlimited MAU", "Dedicated support", "SLA", "On-prem deployment", "Custom integrations"]
    }
  },
  features: [
    {
      title: "Social Login",
      icon: "🔑",
      description: "Allow users to login with Google, Twitter, and other social accounts",
      expanded: "Seamlessly integrate with popular OAuth providers and web2 authentication systems for a smooth onboarding experience."
    },
    {
      title: "Multi-Chain Support",
      icon: "⛓️",
      description: "Works across Ethereum, Polygon, Solana and more",
      expanded: "Maintain a consistent authentication experience regardless of which blockchain your application interacts with."
    },
    {
      title: "SSO Integration",
      icon: "🔐",
      description: "Enterprise SSO with SAML and OIDC support",
      expanded: "Enterprise-grade single sign-on capabilities for organizations that need to integrate with existing identity systems."
    },
    {
      title: "SDK & API",
      icon: "📦",
      description: "Well-documented SDK for major frameworks",
      expanded: "Comprehensive developer tools with SDKs for React, Vue, Angular, and native mobile platforms."
    },
    {
      title: "Key Recovery",
      icon: "🔄",
      description: "Secure key recovery system for users",
      expanded: "Never lose access with our distributed key recovery protocol that maintains security while preventing permanent lockouts."
    },
    {
      title: "Analytics Dashboard",
      icon: "📊",
      description: "Monitor usage patterns and authentication flows",
      expanded: "Gain insights into how users interact with your authentication system with comprehensive analytics tools."
    }
  ],
  media: [
    {
      type: "image",
      url: "https://via.placeholder.com/800x500",
      caption: "Dashboard View"
    },
    {
      type: "image",
      url: "https://via.placeholder.com/800x500",
      caption: "Integration Settings"
    },
    {
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      caption: "Product Demo"
    }
  ],
  reviews: [
    {
      id: "1",
      reviewer: "Alex Chen",
      type: "Developer",
      rating: 8.5,
      date: "2025-04-15",
      pros: "Easy integration, great documentation",
      cons: "Limited customization in free tier",
      body: "Implemented this in our dApp in just a few hours. The social login feature dramatically improved our conversion rates."
    },
    {
      id: "2",
      reviewer: "Sarah Wang",
      type: "Project Manager",
      rating: 7.8,
      date: "2025-05-01",
      pros: "User-friendly dashboard, responsive support",
      cons: "Pricing jumps significantly from free to pro",
      body: "Our team was able to quickly understand and implement the system. Users love the simple login experience."
    },
    {
      id: "3",
      reviewer: "Michael Johnson",
      type: "CTO",
      rating: 9.2,
      date: "2025-04-22",
      pros: "Enterprise features are comprehensive, great security",
      cons: "Initial setup requires some blockchain knowledge",
      body: "After evaluating multiple auth solutions, Web3Auth provided the best balance of security and user experience for our needs."
    }
  ],
  alternatives: [
    {
      id: "moralis",
      name: "Moralis",
      category: "Authentication",
      signalScore: 7.9,
      logo: "📊",
      price: "Freemium",
      badges: ["Web3 SDK", "Multi-Chain"],
      description: "Web3 development platform with authentication capabilities."
    },
    {
      id: "magiclink",
      name: "Magic Link",
      category: "Authentication",
      signalScore: 8.1,
      logo: "🔗",
      price: "$",
      badges: ["Passwordless", "SDK"],
      description: "Passwordless authentication solution for Web3 applications."
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      category: "Authentication",
      signalScore: 8.7,
      logo: "👛",
      price: "Free",
      badges: ["Open Source", "Wallet Integration"],
      description: "Open protocol for connecting wallets to dApps."
    }
  ],
  adminReview: {
    editor: "Jamie Smith",
    date: "May 2025",
    quote: "Web3Auth strikes an excellent balance between security and user experience, making it our top pick for projects that need to onboard non-crypto users."
  }
};

export default function ProductDetail() {
  const { productId } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("reviews");
  
  // In a real app, we would fetch the product data based on productId
  const product = productData;

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-muted/50 to-background pt-6 pb-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Product Logo */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center text-4xl md:text-5xl">
                {product.logo}
              </div>
              
              {/* Product Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                  <Badge variant="secondary" className="w-fit">
                    {product.category}
                  </Badge>
                </div>
                
                <p className="text-lg text-muted-foreground mb-4">
                  {product.editorialSummary}
                </p>
                
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {product.badges.map((badge, index) => (
                    <Badge key={index} variant="outline">
                      {badge}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <a 
                    href={product.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {product.website}
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>
              
              {/* Signal Score and Actions */}
              <div className="flex flex-row md:flex-col items-center gap-4 mt-2">
                <div className="flex flex-col items-center">
                  <SignalScoreBadge score={product.signalScore} size="lg" />
                  <span className="text-xs text-muted-foreground mt-1">Signal Score</span>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={isSaved ? "default" : "outline"}
                    onClick={handleSave}
                    className="h-10 px-4"
                  >
                    <Save className="mr-1 h-4 w-4" />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline" className="h-10 px-4">
                    <BarChart className="mr-1 h-4 w-4" />
                    Compare
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Meta Overview */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Pricing Model</h3>
                <p className="font-medium">{product.price}</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Use Cases</h3>
                <div className="flex flex-wrap gap-2">
                  {product.useCase.map((useCase, index) => (
                    <Badge key={index} variant="secondary">
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Reviewer</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                    {product.reviewerPersona}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              {/* Media Carousel */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Product Tour</h2>
                <ProductMediaCarousel media={product.media} />
              </section>
              
              {/* Features */}
              <section>
                <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                <FeatureGrid features={product.features} />
              </section>
            </TabsContent>
            
            <TabsContent value="pricing" className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">Pricing Plans</h2>
                <PricingTable pricing={product.pricing} />
                
                <div className="mt-6 text-center">
                  <Button>
                    Compare with Other Tools
                  </Button>
                </div>
              </section>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-8">
              <ReviewSection reviews={product.reviews} />
            </TabsContent>
            
            <TabsContent value="alternatives" className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {product.alternatives.map((alt) => (
                    <ProductCard key={alt.id} product={alt} className="h-full" />
                  ))}
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Admin Review */}
        <div className="bg-muted/30 border-t">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-lg">Editorial Review</h3>
              </div>
              
              <blockquote className="italic border-l-4 border-primary/30 pl-4 py-2 mb-4">
                "{product.adminReview.quote}"
              </blockquote>
              
              <p className="text-sm text-muted-foreground">
                Reviewed by {product.adminReview.editor} – Updated {product.adminReview.date}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
