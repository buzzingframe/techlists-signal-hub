
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

export interface DatabaseProduct {
  id: string;
  name: string;
  description?: string;
  category: string;
  website?: string;
  logo_url?: string;
  signal_score?: number;
  badges?: string[];
  use_case?: string[];
  pricing?: any;
  features?: any;
  media?: any;
  created_at: string;
  updated_at: string;
  status?: string;
}

export const productService = {
  async getAllProducts(includeAllStatuses = false): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select('*');

    if (!includeAllStatuses) {
      query = query.eq('status', 'approved');
    }

    const { data, error } = await query.order('created_at', { ascending: false });

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
      .in('id', ids)
      .eq('status', 'approved');

    if (error) {
      console.error('Error fetching products by IDs:', error);
      throw error;
    }

    // Return products in the same order as the input IDs
    const productMap = new Map(data?.map(p => [p.id, transformDatabaseProduct(p)]) || []);
    return ids.map(id => productMap.get(id)).filter(Boolean) as Product[];
  },

  async searchProducts(query: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'approved')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });

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
    description: dbProduct.description || '',
    category: dbProduct.category,
    website: dbProduct.website || '',
    logo: dbProduct.logo_url || '',
    signalScore: dbProduct.signal_score || 0,
    badges: dbProduct.badges || [],
    useCase: dbProduct.use_case || [],
    pricing: dbProduct.pricing || {},
    features: Array.isArray(dbProduct.features) ? dbProduct.features : [],
    media: Array.isArray(dbProduct.media) ? dbProduct.media : [],
    price: "Free" as const,
    // TODO: Add proper admin review and other missing fields
    adminReview: null,
  };
}
