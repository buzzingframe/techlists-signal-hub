
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewSection } from "@/components/ReviewSection";
import { ReviewModal } from "@/components/ReviewModal";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductMetaOverview } from "@/components/product/ProductMetaOverview";
import { ProductEditorialReview } from "@/components/product/ProductEditorialReview";
import { ProductOverviewTab } from "@/components/product/ProductOverviewTab";
import { ProductPricingTab } from "@/components/product/ProductPricingTab";
import { ProductAlternativesTab } from "@/components/product/ProductAlternativesTab";
import { Product } from "@/types/product";
import { Media } from "@/components/ProductMediaCarousel";

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
      type: "image" as const,
      url: "https://via.placeholder.com/800x500",
      caption: "Dashboard View"
    },
    {
      type: "image" as const,
      url: "https://via.placeholder.com/800x500",
      caption: "Integration Settings"
    },
    {
      type: "video" as const,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      caption: "Product Demo"
    }
  ] as Media[],
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
      price: "Freemium" as const,
      badges: ["Web3 SDK", "Multi-Chain"],
      description: "Web3 development platform with authentication capabilities."
    },
    {
      id: "magiclink",
      name: "Magic Link",
      category: "Authentication",
      signalScore: 8.1,
      logo: "🔗",
      price: "$" as const,
      badges: ["Passwordless", "SDK"],
      description: "Passwordless authentication solution for Web3 applications."
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      category: "Authentication",
      signalScore: 8.7,
      logo: "👛",
      price: "Free" as const,
      badges: ["Open Source", "Wallet Integration"],
      description: "Open protocol for connecting wallets to dApps."
    }
  ],
  adminReview: {
    editor: "Jamie Smith",
    date: "May 2025",
    quote: "Web3Auth strikes an excellent balance between security and user experience, making it our top pick for projects that need to onboard non-crypto users."
  }
} as Product;

export default function ProductDetail() {
  const { productId } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  
  // In a real app, we would fetch the product data based on productId
  const product = productData;

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleReviewSubmitted = () => {
    // In a real app, you would refresh the reviews data here
    console.log("Review submitted successfully");
  };

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
                onReviewSubmitted={handleReviewSubmitted}
              />
            </div>
            
            <TabsContent value="overview">
              <ProductOverviewTab features={product.features} media={product.media} />
            </TabsContent>
            
            <TabsContent value="pricing">
              <ProductPricingTab pricing={product.pricing} />
            </TabsContent>
            
            <TabsContent value="reviews">
              <ReviewSection reviews={product.reviews} />
            </TabsContent>
            
            <TabsContent value="alternatives">
              <ProductAlternativesTab alternatives={product.alternatives} />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Admin Review */}
        <ProductEditorialReview adminReview={product.adminReview} />
      </main>
      
      <Footer />
    </div>
  );
}
