
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserPreferences, UserInterest, UserRole } from "@/types/user";

async function getSavedProductsCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('saved_products')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) {
    console.error('Error getting saved products count:', error);
    return 0;
  }

  return count || 0;
}

async function getReviewsCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) {
    console.error('Error getting reviews count:', error);
    return 0;
  }

  return count || 0;
}

export const userService = {
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    if (!data) return null;

    // Get user stats
    const [savedCount, reviewsCount] = await Promise.all([
      getSavedProductsCount(userId),
      getReviewsCount(userId)
    ]);

    return {
      id: data.id,
      username: data.username || '',
      avatarUrl: data.avatar_url,
      bio: data.bio,
      joinedAt: data.joined_at,
      isContributor: data.is_contributor || false,
      hasCompletedOnboarding: data.has_completed_onboarding || false,
      stats: {
        savedProducts: savedCount,
        reviewsWritten: reviewsCount,
        stacksCreated: 0 // TODO: Implement stacks
      }
    };
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    const { error } = await supabase
      .from('profiles')
      .update({
        username: updates.username,
        avatar_url: updates.avatarUrl,
        bio: updates.bio,
        has_completed_onboarding: updates.hasCompletedOnboarding
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  async getUserPreferences(userId: string): Promise<UserPreferences | null> {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user preferences:', error);
      return null;
    }

    if (!data) return null;

    return {
      interests: data.interests as UserInterest[] || [],
      role: data.role as UserRole
    };
  },

  async updateUserPreferences(userId: string, preferences: UserPreferences): Promise<void> {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        interests: preferences.interests,
        role: preferences.role
      });

    if (error) {
      console.error('Error updating user preferences:', error);
      throw error;
    }
  },

  async getSavedProducts(userId: string): Promise<string[]> {
    const { data, error } = await supabase
      .from('saved_products')
      .select('product_id')
      .eq('user_id', userId)
      .order('saved_at', { ascending: false });

    if (error) {
      console.error('Error fetching saved products:', error);
      throw error;
    }

    return data?.map(item => item.product_id) || [];
  },

  async saveProduct(userId: string, productId: string): Promise<void> {
    const { error } = await supabase
      .from('saved_products')
      .insert({
        user_id: userId,
        product_id: productId
      });

    if (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  },

  async unsaveProduct(userId: string, productId: string): Promise<void> {
    const { error } = await supabase
      .from('saved_products')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) {
      console.error('Error unsaving product:', error);
      throw error;
    }
  },

  async isProductSaved(userId: string, productId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('saved_products')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking if product is saved:', error);
      return false;
    }

    return !!data;
  }
};
