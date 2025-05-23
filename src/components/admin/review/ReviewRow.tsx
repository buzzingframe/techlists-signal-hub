
import { format } from "date-fns";
import { CheckCircle, XCircle, MoreVertical, Eye, Pencil } from "lucide-react";
import { FlaggedReview } from "@/components/admin/review/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { getFlagBadgeColor } from "@/components/admin/review/utils";

interface ReviewRowProps {
  review: FlaggedReview;
  onViewReview: (review: FlaggedReview) => void;
  onEditReview: (review: FlaggedReview) => void;
  onApproveReview: (id: string) => void;
  onRejectReview: (id: string) => void;
}

export function ReviewRow({
  review,
  onViewReview,
  onEditReview,
  onApproveReview,
  onRejectReview,
}: ReviewRowProps) {
  return (
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
            onClick={() => onApproveReview(review.id)}
          >
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="sr-only">Approve</span>
          </Button>
          <Button 
            size="icon" 
            variant="ghost"
            onClick={() => onRejectReview(review.id)}
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
              <DropdownMenuItem onClick={() => onViewReview(review)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEditReview(review)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Review
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}
