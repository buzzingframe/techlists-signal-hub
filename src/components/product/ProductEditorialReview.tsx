
import { Star } from "lucide-react";

interface ProductEditorialReviewProps {
  adminReview?: {
    editor: string;
    date: string;
    quote: string;
  };
}

export function ProductEditorialReview({ adminReview }: ProductEditorialReviewProps) {
  if (!adminReview) return null;
  
  return (
    <div className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold text-lg">Editorial Review</h3>
          </div>
          
          <blockquote className="italic border-l-4 border-primary/30 pl-4 py-2 mb-4">
            "{adminReview.quote}"
          </blockquote>
          
          <p className="text-sm text-muted-foreground">
            Reviewed by {adminReview.editor} – Updated {adminReview.date}
          </p>
        </div>
      </div>
    </div>
  );
}
