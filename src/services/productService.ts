
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

export interface DatabaseProduct {
  id: string;
  name: string;
  category: string;
  signal_score: number;
  logo: string;
  price: string;
  badges: string[];
  description: string;
  website?: string;
  editorial_summary?: string;
  use_case?: string[];
  reviewer_persona?: string;
  features?: any;
  media?: any;
  pricing?: any;
  created_at: string;
  updated_at: string;
}

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('signal_score', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    return data?.map(transformDatabaseProduct) || [];
  },

  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return data ? transformDatabaseProduct(data) : null;
  },

  async getProductsByIds(ids: string[]): Promise<Product[]> {
    if (ids.length === 0) return [];

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', ids);

    if (error) {
      console.error('Error fetching products by IDs:', error);
      throw error;
    }

    return data?.map(transformDatabaseProduct) || [];
  },

  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .order('signal_score', { ascending: false });

    if (error) {
      console.error('Error searching products:', error);
      throw error;
    }

    return data?.map(transformDatabaseProduct) || [];
  }
};

function transformDatabaseProduct(dbProduct: DatabaseProduct): Product {
  // Create default features if none exist
  const defaultFeatures = [
    {
      title: "Core Functionality",
      icon: "⚡",
      description: dbProduct.description || "Main product features",
      expanded: dbProduct.editorial_summary || dbProduct.description || ""
    }
  ];

  // Create default media if none exists
  const defaultMedia = [
    {
      type: "image" as const,
      url: "/placeholder.svg",
      caption: `${dbProduct.name} interface`
    }
  ];

  // Create default pricing if none exists
  const defaultPricing = {
    free: {
      name: "Free",
      price: dbProduct.price === "Free" ? "Free" : "Not Available",
      features: ["Basic features", "Community support"]
    },
    pro: {
      name: "Pro", 
      price: dbProduct.price === "$" ? "$9.99/month" : dbProduct.price === "$$" ? "$29.99/month" : "Contact us",
      features: ["Advanced features", "Priority support", "Extended functionality"]
    },
    enterprise: {
      name: "Enterprise",
      price: "Contact us",
      features: ["All features", "Custom integrations", "Dedicated support"]
    }
  };

  return {
    id: dbProduct.id,
    name: dbProduct.name,
    category: dbProduct.category,
    signalScore: dbProduct.signal_score,
    logo: dbProduct.logo || '📦',
    price: dbProduct.price as "Free" | "$" | "$$" | "Freemium",
    badges: dbProduct.badges || [],
    description: dbProduct.description || '',
    website: dbProduct.website,
    editorialSummary: dbProduct.editorial_summary || dbProduct.description || `${dbProduct.name} is a ${dbProduct.category.toLowerCase()} tool.`,
    useCase: dbProduct.use_case || [`${dbProduct.category} management`, "Productivity", "Business tools"],
    reviewerPersona: dbProduct.reviewer_persona,
    features: dbProduct.features || defaultFeatures,
    media: dbProduct.media || defaultMedia,
    pricing: dbProduct.pricing || defaultPricing,
    reviews: [], // Will be populated separately if needed
    alternatives: [], // Will be populated separately if needed
    adminReview: {
      editor: "Admin Team",
      date: new Date().toLocaleDateString(),
      quote: `${dbProduct.name} offers excellent ${dbProduct.category.toLowerCase()} capabilities with a signal score of ${dbProduct.signal_score}.`
    }
  };
}
