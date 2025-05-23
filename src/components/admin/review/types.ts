
import { FlagReason } from "@/types/review";

// Define a type that matches our mock data structure
export interface FlaggedReview {
  id: string;
  productName: string;
  reviewer: string;
  rating: number;
  content: string;
  flagReason: FlagReason;
  flaggedAt: string;
  reviewerType: string;
}
