
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ReviewList } from "@/components/admin/review/ReviewList";
import { ReviewDetailDialog } from "@/components/admin/review/ReviewDetailDialog";
import { FlaggedReview } from "@/components/admin/review/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RealReviewsManager() {
  const [selectedReview, setSelectedReview] = useState<FlaggedReview | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const { data: flaggedReviews = [], isLoading, refetch } = useQuery({
    queryKey: ['flagged-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          products!reviews_product_id_fkey(name)
        `)
        .in('status', ['needs_moderation', 'flagged'])
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(review => ({
        id: review.id,
        productName: review.products?.name || 'Unknown Product',
        reviewer: `User ${review.user_id?.substring(0, 8)}...`,
        reviewerType: review.reviewer_type || 'casual_user',
        rating: review.score || 0,
        content: `${review.pros}\n\nCons: ${review.cons}${review.verdict ? `\n\nVerdict: ${review.verdict}` : ''}`,
        flagReason: review.flag_reason as any || 'inappropriate',
        flaggedAt: review.flagged_at || review.created_at,
        status: review.status
      })) as FlaggedReview[];
    }
  });

  const handleViewReview = (review: FlaggedReview) => {
    setSelectedReview(review);
    setViewDialogOpen(true);
  };

  const handleApproveReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ 
          status: 'active',
          flag_reason: null,
          flagged_at: null
        })
        .eq('id', id);

      if (error) throw error;
      
      refetch();
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleRejectReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;
      
      refetch();
    } catch (error) {
      console.error('Error rejecting review:', error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading reviews...</p>
        </CardContent>
      </Card>
    );
  }

  if (flaggedReviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Reviews Needing Moderation
            <Badge variant="secondary">0</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No reviews currently need moderation. All reviews are approved!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">Reviews Needing Moderation</h2>
        <Badge variant="destructive">{flaggedReviews.length}</Badge>
      </div>
      
      <ReviewList
        reviews={flaggedReviews}
        onViewReview={handleViewReview}
        onEditReview={handleViewReview}
        onApproveReview={handleApproveReview}
        onRejectReview={handleRejectReview}
      />

      <ReviewDetailDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        review={selectedReview}
        onApprove={handleApproveReview}
        onReject={handleRejectReview}
      />
    </div>
  );
}
