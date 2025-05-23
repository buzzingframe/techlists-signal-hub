
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
    editorialSummary: dbProduct.editorial_summary,
    useCase: dbProduct.use_case,
    reviewerPersona: dbProduct.reviewer_persona,
    features: dbProduct.features,
    media: dbProduct.media,
    pricing: dbProduct.pricing,
  };
}
