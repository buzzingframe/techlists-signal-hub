import { useState } from "react";
import { ReviewList } from "@/components/admin/review/ReviewList";
import { ReviewDetailDialog } from "@/components/admin/review/ReviewDetailDialog";
import { FlaggedReview } from "@/components/admin/review/types";
import { mockReviews } from "@/components/admin/review/mockData";

export function AdminReviews() {
  const [selectedReview, setSelectedReview] = useState<FlaggedReview | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Reviews data from mock
  const reviews = mockReviews;

  const handleViewReview = (review: FlaggedReview) => {
    setSelectedReview(review);
    setViewDialogOpen(true);
  };

  const handleEditReview = (review: FlaggedReview) => {
    setSelectedReview(review);
    setEditDialogOpen(true);
  };

  const handleApproveReview = (id: string) => {
    console.log(`Approved review ${id}`);
    // Here you would call your API to approve the review
  };

  const handleRejectReview = (id: string) => {
    console.log(`Rejected review ${id}`);
    // Here you would call your API to reject the review
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Flagged Reviews</h2>
      
      <ReviewList
        reviews={reviews}
        onViewReview={handleViewReview}
        onEditReview={handleEditReview}
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

      {/* Edit Dialog would go here - similar to view dialog but with form fields */}
    </div>
  );
}
