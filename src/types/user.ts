
import { Product } from "@/types/product";

export interface UserProfile {
  id: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  joinedAt: string;
  isContributor: boolean;
  stats: {
    savedProducts: number;
    reviewsWritten: number;
    stacksCreated: number;
  };
}

export interface UserReview {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  content: string;
  pros: string;
  cons: string;
  createdAt: string;
}

export interface UserStack {
  id: string;
  title: string;
  description: string;
  productIds: string[];
  isPublic: boolean;
  createdAt: string;
}

export interface UserSubmission {
  id: string;
  productName: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  productId?: string;
}

// Settings & Preferences
export interface UserSettings {
  notificationPreferences: {
    reviewComments: boolean;
    productUpdates: boolean;
    newFeatures: boolean;
  };
  privacySettings: {
    publicProfile: boolean;
    showSavedProducts: boolean;
    showReviews: boolean;
  };
  connectedAccounts: {
    email?: string;
    walletAddress?: string;
  };
}
