
import { supabase } from "@/integrations/supabase/client";
import { Review } from "@/types/review";

export interface CreateReviewData {
  productId: string;
  score: number;
  pros: string;
  cons: string;
  verdict?: string;
  reviewerType: 'web3_developer' | 'founder' | 'power_user' | 'casual_user' | 'reviewer';
  pricingFeedback: 'got_free' | 'paid' | 'would_pay' | 'not_worth';
  comparedProduct?: string;
}

export const reviewService = {
  async getProductReviews(productId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles!user_id(username)
      `)
      .eq('product_id', productId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }

    return data?.map(transformDatabaseReview) || [];
  },

  async createReview(userId: string, reviewData: CreateReviewData): Promise<void> {
    const { error } = await supabase
      .from('reviews')
      .insert({
        user_id: userId,
        product_id: reviewData.productId,
        score: reviewData.score,
        pros: reviewData.pros,
        cons: reviewData.cons,
        verdict: reviewData.verdict,
        reviewer_type: reviewData.reviewerType,
        pricing_feedback: reviewData.pricingFeedback,
        compared_product: reviewData.comparedProduct,
        status: 'needs_moderation'
      });

    if (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  async getUserReviews(userId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        products!product_id(name)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user reviews:', error);
      throw error;
    }

    return data?.map(transformDatabaseReview) || [];
  },

  async getReviewById(reviewId: string): Promise<Review | null> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles!user_id(username),
        products!product_id(name)
      `)
      .eq('id', reviewId)
      .single();

    if (error) {
      console.error('Error fetching review:', error);
      return null;
    }

    return data ? transformDatabaseReview(data) : null;
  }
};

function transformDatabaseReview(dbReview: any): Review {
  return {
    id: dbReview.id,
    product_id: dbReview.product_id,
    user_id: dbReview.user_id,
    score: dbReview.score,
    pros: dbReview.pros,
    cons: dbReview.cons,
    verdict: dbReview.verdict,
    reviewer_type: dbReview.reviewer_type,
    pricing_feedback: dbReview.pricing_feedback,
    compared_product: dbReview.compared_product,
    status: dbReview.status,
    created_at: dbReview.created_at,
    updated_at: dbReview.updated_at,
    flagReason: dbReview.flag_reason,
    flaggedAt: dbReview.flagged_at
  };
}
