
import { supabase } from "@/integrations/supabase/client";
import { CuratedList } from "@/types/product";

export interface DatabaseCuratedList {
  id: string;
  title: string;
  description: string;
  created_by: string;
  is_pinned: boolean;
  cover_image?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  profiles?: {
    username: string;
  };
}

export const curatedListService = {
  async getAllLists(): Promise<CuratedList[]> {
    const { data, error } = await supabase
      .from('curated_lists')
      .select(`
        *,
        profiles!created_by(username)
      `)
      .order('is_pinned', { ascending: false })
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching curated lists:', error);
      throw error;
    }

    return data?.map(transformDatabaseList) || [];
  },

  async getListById(id: string): Promise<CuratedList | null> {
    const { data, error } = await supabase
      .from('curated_lists')
      .select(`
        *,
        profiles!created_by(username)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching curated list:', error);
      return null;
    }

    return data ? transformDatabaseList(data) : null;
  },

  async getListProducts(listId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('curated_list_products')
      .select('product_id')
      .eq('list_id', listId)
      .order('position', { ascending: true });

    if (error) {
      console.error('Error fetching list products:', error);
      throw error;
    }

    return data?.map(item => item.product_id) || [];
  }
};

function transformDatabaseList(dbList: DatabaseCuratedList): CuratedList {
  return {
    id: dbList.id,
    title: dbList.title,
    description: dbList.description || '',
    createdAt: dbList.created_at,
    updatedAt: dbList.updated_at,
    createdBy: dbList.profiles?.username || 'Unknown',
    isPinned: dbList.is_pinned,
    coverImage: dbList.cover_image,
    tags: dbList.tags || [],
    productIds: [], // This will be populated separately
  };
}
