
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock review data
const mockReviews = [
  {
    id: "1",
    productName: "MetaMask",
    reviewer: "crypto_fan",
    rating: 4,
    content: "Great wallet with excellent features. Highly recommend for beginners.",
    flagReason: "spam",
    flaggedAt: "2025-05-20T11:30:00Z",
    reviewerType: "user"
  },
  {
    id: "2",
    productName: "Uniswap",
    reviewer: "defi_trader",
    rating: 5,
    content: "Best DEX out there! The interface is clean and transactions are fast.",
    flagReason: null,
    flaggedAt: null,
    reviewerType: "developer"
  },
  {
    id: "3",
    productName: "OpenSea",
    reviewer: "nft_collector",
    rating: 2,
    content: "Too many fees and the customer service is horrible. Don't waste your time.",
    flagReason: "inappropriate",
    flaggedAt: "2025-05-19T09:15:00Z",
    reviewerType: "user"
  },
  {
    id: "4",
    productName: "Chainlink",
    reviewer: "blockchain_dev",
    rating: 5,
    content: "The most reliable oracle solution. Integration was smooth.",
    flagReason: null,
    flaggedAt: null,
    reviewerType: "developer"
  },
  {
    id: "5",
    productName: "Aave",
    reviewer: "yield_farmer",
    rating: 3,
    content: "Good platform but interest rates are low compared to competitors.",
    flagReason: "duplicate",
    flaggedAt: "2025-05-18T14:45:00Z",
    reviewerType: "user"
  }
];

type FlagReason = "spam" | "inappropriate" | "duplicate" | null;
type ReviewerType = "user" | "developer" | "enterprise" | "admin";

interface Review {
  id: string;
  productName: string;
  reviewer: string;
  rating: number;
  content: string;
  flagReason: FlagReason;
  flaggedAt: string | null;
  reviewerType: ReviewerType;
}

export function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);
  const [selectedReviewerType, setSelectedReviewerType] = useState<ReviewerType>("user");
  const { toast } = useToast();

  const handleApprove = (review: Review) => {
    setReviews(reviews.map(r => 
      r.id === review.id ? { ...r, flagReason: null, flaggedAt: null } : r
    ));
    
    toast({
      title: "Review approved",
      description: "The review has been approved and will remain visible."
    });
  };

  const handleReject = (review: Review) => {
    // In a real app, this would archive the review or mark it as rejected
    setReviews(reviews.filter(r => r.id !== review.id));
    
    toast({
      title: "Review rejected",
      description: "The review has been removed from the site."
    });
  };

  const handleEditTags = (review: Review) => {
    setSelectedReview(review);
    setSelectedReviewerType(review.reviewerType);
    setIsTagDialogOpen(true);
  };

  const confirmTagEdit = () => {
    if (!selectedReview) return;
    
    setReviews(reviews.map(r => 
      r.id === selectedReview.id ? { ...r, reviewerType: selectedReviewerType } : r
    ));
    
    toast({
      title: "Review updated",
      description: "The reviewer type has been updated."
    });
    
    setIsTagDialogOpen(false);
    setSelectedReview(null);
  };

  const getFlagBadge = (reason: FlagReason) => {
    if (!reason) return null;
    
    const colors = {
      spam: "bg-amber-100 text-amber-800 border-amber-200",
      inappropriate: "bg-red-100 text-red-800 border-red-200",
      duplicate: "bg-blue-100 text-blue-800 border-blue-200"
    };
    
    return (
      <Badge variant="outline" className={colors[reason]}>
        {reason.charAt(0).toUpperCase() + reason.slice(1)}
      </Badge>
    );
  };

  const getReviewerTypeBadge = (type: ReviewerType) => {
    const colors = {
      user: "bg-slate-100 text-slate-800 border-slate-200",
      developer: "bg-purple-100 text-purple-800 border-purple-200",
      enterprise: "bg-indigo-100 text-indigo-800 border-indigo-200",
      admin: "bg-rose-100 text-rose-800 border-rose-200"
    };
    
    return (
      <Badge variant="outline" className={colors[type]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Review Moderation</h2>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by flag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reviews</SelectItem>
            <SelectItem value="flagged">Flagged Only</SelectItem>
            <SelectItem value="spam">Spam</SelectItem>
            <SelectItem value="inappropriate">Inappropriate</SelectItem>
            <SelectItem value="duplicate">Duplicate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Reviewer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Flag</TableHead>
              <TableHead>Review Preview</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">{review.productName}</TableCell>
                <TableCell>{review.reviewer}</TableCell>
                <TableCell>{review.rating}/5</TableCell>
                <TableCell>{getReviewerTypeBadge(review.reviewerType)}</TableCell>
                <TableCell>{getFlagBadge(review.flagReason)}</TableCell>
                <TableCell className="max-w-[200px] truncate">{review.content}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {review.flagReason && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleApprove(review)}
                        >
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="sr-only">Approve</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleReject(review)}
                        >
                          <X className="h-4 w-4 text-red-600" />
                          <span className="sr-only">Reject</span>
                        </Button>
                      </>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditTags(review)}
                    >
                      <Tag className="h-4 w-4" />
                      <span className="sr-only">Edit Tags</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Reviewer Type</DialogTitle>
            <DialogDescription>
              Change how this reviewer is categorized to help users understand the context of their feedback.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="reviewer-type">Reviewer Type</Label>
              <Select 
                value={selectedReviewerType} 
                onValueChange={(value) => setSelectedReviewerType(value as ReviewerType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reviewer type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTagDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmTagEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
