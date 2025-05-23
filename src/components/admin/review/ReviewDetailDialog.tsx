
import { FlaggedReview } from "@/components/admin/review/types";
import { getFlagBadgeColor } from "@/components/admin/review/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface ReviewDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: FlaggedReview | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function ReviewDetailDialog({
  open,
  onOpenChange,
  review,
  onApprove,
  onReject,
}: ReviewDetailDialogProps) {
  if (!review) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Product</h4>
              <p>{review.productName}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Reviewer</h4>
              <p>{review.reviewer}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Rating</h4>
              <p>{review.rating}/5</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Flag Reason</h4>
              <Badge variant={getFlagBadgeColor(review.flagReason)}>
                {review.flagReason}
              </Badge>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Review Content</h4>
            <p className="mt-1 whitespace-pre-wrap">{review.content}</p>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button 
              variant="default" 
              onClick={() => {
                onApprove(review.id);
                onOpenChange(false);
              }}
            >
              Approve Review
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                onReject(review.id);
                onOpenChange(false);
              }}
            >
              Reject Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
