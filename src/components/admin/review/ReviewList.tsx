
import { FlaggedReview } from "@/components/admin/review/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReviewRow } from "@/components/admin/review/ReviewRow";

interface ReviewListProps {
  reviews: FlaggedReview[];
  onViewReview: (review: FlaggedReview) => void;
  onEditReview: (review: FlaggedReview) => void;
  onApproveReview: (id: string) => void;
  onRejectReview: (id: string) => void;
}

export function ReviewList({
  reviews,
  onViewReview,
  onEditReview,
  onApproveReview,
  onRejectReview,
}: ReviewListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Reviewer</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Flag Reason</TableHead>
          <TableHead>Flagged At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.map((review) => (
          <ReviewRow 
            key={review.id}
            review={review}
            onViewReview={onViewReview}
            onEditReview={onEditReview}
            onApproveReview={onApproveReview}
            onRejectReview={onRejectReview}
          />
        ))}
      </TableBody>
    </Table>
  );
}
