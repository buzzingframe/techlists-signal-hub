
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, XCircle, MoreVertical, Eye, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { FlagReason, Review } from "@/types/review"; 

// Define a type that matches our mock data structure
interface FlaggedReview {
  id: string;
  productName: string;
  reviewer: string;
  rating: number;
  content: string;
  flagReason: FlagReason;
  flaggedAt: string;
  reviewerType: string;
}

export function AdminReviews() {
  const [selectedReview, setSelectedReview] = useState<FlaggedReview | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Mock reviews data
  const reviews: FlaggedReview[] = [
    {
      id: "1",
      productName: "Metamask",
      reviewer: "johndoe",
      rating: 4,
      content: "Great wallet, very user friendly and secure. Highly recommend for beginners.",
      flagReason: "spam" as FlagReason,
      flaggedAt: "2023-05-20T14:30:00Z",
      reviewerType: "verified",
    },
    {
      id: "2",
      productName: "Uniswap",
      reviewer: "cryptotrader",
      rating: 2,
      content: "Interface is confusing and fees are too high.",
      flagReason: "inappropriate" as FlagReason,
      flaggedAt: "2023-05-21T09:15:00Z",
      reviewerType: "contributor",
    },
    {
      id: "3",
      productName: "OpenSea",
      reviewer: "nftcollector",
      rating: 3,
      content: "Good marketplace but needs better filters.",
      flagReason: "duplicate" as FlagReason,
      flaggedAt: "2023-05-22T16:45:00Z",
      reviewerType: "expert",
    },
  ];

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

  const getFlagBadgeColor = (reason: FlagReason) => {
    switch (reason) {
      case "inappropriate":
        return "destructive";
      case "spam":
        return "secondary";
      case "duplicate":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Flagged Reviews</h2>
      
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
            <TableRow key={review.id}>
              <TableCell className="font-medium">{review.productName}</TableCell>
              <TableCell>
                {review.reviewer}
                <Badge variant="outline" className="ml-2 text-xs">
                  {review.reviewerType}
                </Badge>
              </TableCell>
              <TableCell>{review.rating}/5</TableCell>
              <TableCell>
                <Badge variant={getFlagBadgeColor(review.flagReason)}>
                  {review.flagReason}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(review.flaggedAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => handleApproveReview(review.id)}
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="sr-only">Approve</span>
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => handleRejectReview(review.id)}
                  >
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Reject</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewReview(review)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditReview(review)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Review
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Product</h4>
                  <p>{selectedReview.productName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Reviewer</h4>
                  <p>{selectedReview.reviewer}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Rating</h4>
                  <p>{selectedReview.rating}/5</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Flag Reason</h4>
                  <Badge variant={getFlagBadgeColor(selectedReview.flagReason)}>
                    {selectedReview.flagReason}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Review Content</h4>
                <p className="mt-1 whitespace-pre-wrap">{selectedReview.content}</p>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setViewDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => {
                    handleApproveReview(selectedReview.id);
                    setViewDialogOpen(false);
                  }}
                >
                  Approve Review
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    handleRejectReview(selectedReview.id);
                    setViewDialogOpen(false);
                  }}
                >
                  Reject Review
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog would go here - similar to view dialog but with form fields */}
    </div>
  );
}
