
import { supabase } from "@/integrations/supabase/client";

export interface ReviewSubmission {
  productId: string;
  score: number;
  pros: string;
  cons: string;
  verdict?: string;
  reviewerType: string;
  pricingFeedback: string;
  comparedProduct?: string;
}

export const reviewService = {
  async submitReview(review: ReviewSubmission) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("You must be logged in to submit a review");
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        product_id: review.productId,
        user_id: user.id,
        score: review.score,
        pros: review.pros,
        cons: review.cons,
        verdict: review.verdict,
        reviewer_type: review.reviewerType,
        pricing_feedback: review.pricingFeedback,
        compared_product: review.comparedProduct,
        status: 'needs_moderation'
      })
      .select()
      .single();

    if (error) {
      console.error('Error submitting review:', error);
      throw error;
    }

    return data;
  },

  async getProductReviews(productId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }

    return data || [];
  }
};
