
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
  hasCompletedOnboarding?: boolean;
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
    savedProductReviews?: boolean;
    weeklyDigest?: boolean;
    reviewReplies?: boolean;
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

export type UserInterest = 
  | "wallets" 
  | "dao_tools" 
  | "nft_utilities" 
  | "developer_infra" 
  | "defi" 
  | "security" 
  | "analytics" 
  | "identity";

export type UserRole = 
  | "developer" 
  | "founder" 
  | "researcher" 
  | "trader" 
  | "explorer";

export interface UserPreferences {
  interests: UserInterest[];
  role: UserRole;
}
