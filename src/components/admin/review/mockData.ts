
import { FlaggedReview } from "./types";
import { FlagReason } from "@/types/review";

// Mock reviews data
export const mockReviews: FlaggedReview[] = [
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
