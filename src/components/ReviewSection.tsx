
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignalScoreBadge } from "@/components/SignalScoreBadge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Review {
  id: string;
  reviewer: string;
  type: string;
  rating: number;
  date: string;
  pros: string;
  cons: string;
  body: string;
}

interface ReviewSectionProps {
  reviews: Review[];
}

export function ReviewSection({ reviews }: ReviewSectionProps) {
  const [filter, setFilter] = useState<string>("all");
  
  // In a real app, we would filter the reviews based on the filter
  const filteredReviews = reviews;
  
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold">Reviews & Feedback</h2>
        
        <div className="flex gap-2">
          <Tabs defaultValue="recent" className="w-[300px]">
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="top">Top</TabsTrigger>
              <TabsTrigger value="devs">Devs Only</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-medium">{review.reviewer}</h3>
                  <Badge variant="outline" className="text-xs">
                    {review.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="text-sm mb-4">
                  {review.body}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/10 rounded p-3">
                    <h4 className="text-xs font-medium text-green-800 dark:text-green-300 mb-1">PROS</h4>
                    <p className="text-sm">{review.pros}</p>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/10 rounded p-3">
                    <h4 className="text-xs font-medium text-red-800 dark:text-red-300 mb-1">CONS</h4>
                    <p className="text-sm">{review.cons}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <SignalScoreBadge score={review.rating} size="md" />
                <span className="text-xs text-muted-foreground mt-1">Rating</span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center mt-8">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      </div>
    </section>
  );
}
