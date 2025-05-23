
import { useState } from "react";
import { UserReview } from "@/types/user";
import { SignalScoreBadge } from "@/components/SignalScoreBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Edit, Trash2, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ReviewsTabProps {
  reviews: UserReview[];
  onDeleteReview: (reviewId: string) => void;
}

export function ReviewsTab({ reviews, onDeleteReview }: ReviewsTabProps) {
  const [filterOption, setFilterOption] = useState<string>("all");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">My Reviews</h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterOption("all")}>
                All Reviews
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterOption("recent")}>
                Most Recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterOption("highest")}>
                Highest Rated
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-medium mb-1">
                          {review.productName}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>
                            {formatDistanceToNow(new Date(review.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>
                      <SignalScoreBadge score={review.rating} size="md" />
                    </div>

                    <p className="text-sm mb-4">{review.content}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 dark:bg-green-900/10 rounded p-3">
                        <h4 className="text-xs font-medium text-green-800 dark:text-green-300 mb-1">
                          PROS
                        </h4>
                        <p className="text-sm">{review.pros}</p>
                      </div>

                      <div className="bg-red-50 dark:bg-red-900/10 rounded p-3">
                        <h4 className="text-xs font-medium text-red-800 dark:text-red-300 mb-1">
                          CONS
                        </h4>
                        <p className="text-sm">{review.cons}</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 text-xs"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => onDeleteReview(review.id)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Star className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No reviews written yet</h3>
            <CardDescription className="text-center">
              Share your expertise by reviewing products you've used.
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
