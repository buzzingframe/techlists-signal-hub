
import { useState, useEffect } from "react";
import { UserProfile, UserReview, UserStack, UserSubmission, UserSettings } from "@/types/user";
import { Product } from "@/types/product";

// Mock data - in a real app, this would come from an API or database
const MOCK_USER: UserProfile = {
  id: "user-1",
  username: "crypto_enthusiast.eth",
  avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=crypto_enthusiast",
  bio: "Web3 developer and product enthusiast. Building the decentralized future.",
  joinedAt: "2023-09-15T12:00:00Z",
  isContributor: true,
  stats: {
    savedProducts: 24,
    reviewsWritten: 12,
    stacksCreated: 3,
  },
};

const MOCK_SAVED_PRODUCTS: Product[] = [
  {
    id: "product-1",
    name: "MetaMask",
    category: "Wallet",
    signalScore: 92,
    logo: "🦊",
    price: "Free",
    badges: ["Popular", "Essential", "Easy Setup"],
    description: "A crypto wallet & gateway to blockchain apps",
  },
  {
    id: "product-2",
    name: "Uniswap",
    category: "DEX",
    signalScore: 88,
    logo: "🦄",
    price: "Freemium",
    badges: ["DeFi", "High Volume", "V3"],
    description: "A decentralized protocol for automated liquidity provision on Ethereum",
  },
  {
    id: "product-3",
    name: "Arweave",
    category: "Storage",
    signalScore: 85,
    logo: "🪿",
    price: "$$",
    badges: ["Permanent", "Decentralized"],
    description: "A permanent serverless web powered by a novel cryptocurrency",
  },
];

const MOCK_REVIEWS: UserReview[] = [
  {
    id: "review-1",
    productId: "product-1",
    productName: "MetaMask",
    rating: 90,
    content: "Best wallet for beginners and power users alike. Very intuitive.",
    pros: "Easy to use, great browser integration, large community support",
    cons: "Gas fee estimations can be inaccurate at times",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "review-2",
    productId: "product-2",
    productName: "Uniswap",
    rating: 88,
    content: "Revolutionary DeFi product with excellent UX for swaps",
    pros: "Very liquid, great UI, innovative constant product formula",
    cons: "MEV can lead to price impact on larger trades",
    createdAt: "2023-11-22T16:45:00Z",
  },
];

const MOCK_STACKS: UserStack[] = [
  {
    id: "stack-1",
    title: "Essential DeFi Toolkit",
    description: "My go-to tools for daily DeFi activities",
    productIds: ["product-1", "product-2"],
    isPublic: true,
    createdAt: "2023-10-05T09:15:00Z",
  },
  {
    id: "stack-2",
    title: "Web3 Dev Stack",
    description: "Tools I use for blockchain development",
    productIds: ["product-3"],
    isPublic: false,
    createdAt: "2024-02-18T14:20:00Z",
  },
];

const MOCK_SUBMISSIONS: UserSubmission[] = [
  {
    id: "submission-1",
    productName: "EtherScan Pro",
    status: "pending",
    submittedAt: "2024-04-10T11:20:00Z",
  },
  {
    id: "submission-2",
    productName: "ZK Bridge",
    status: "approved",
    submittedAt: "2024-03-05T16:30:00Z",
    productId: "product-4",
  },
  {
    id: "submission-3",
    productName: "DeFi Tracker",
    status: "rejected",
    submittedAt: "2024-02-20T09:45:00Z",
  },
];

const MOCK_SETTINGS: UserSettings = {
  notificationPreferences: {
    reviewComments: true,
    productUpdates: true,
    newFeatures: false,
  },
  privacySettings: {
    publicProfile: true,
    showSavedProducts: true,
    showReviews: false,
  },
  connectedAccounts: {
    email: "user@example.com",
    walletAddress: "0x1234...5678",
  },
};

export function useUserProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [stacks, setStacks] = useState<UserStack[]>([]);
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("saved");
  const [saveSortOption, setSaveSortOption] = useState<string>("recent");

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setUserProfile(MOCK_USER);
      setSavedProducts(MOCK_SAVED_PRODUCTS);
      setReviews(MOCK_REVIEWS);
      setStacks(MOCK_STACKS);
      setSubmissions(MOCK_SUBMISSIONS);
      setSettings(MOCK_SETTINGS);
      setLoading(false);
    }, 500);
  }, []);

  // Sort saved products based on selected option
  const sortedSavedProducts = [...savedProducts].sort((a, b) => {
    switch (saveSortOption) {
      case "alphabetical":
        return a.name.localeCompare(b.name);
      case "score":
        return b.signalScore - a.signalScore;
      case "recent":
      default:
        return 0; // In a real app, we would use created_at timestamps
    }
  });

  const updateUserProfile = (updatedProfile: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updatedProfile });
    }
  };

  const updateSettings = (updatedSettings: Partial<UserSettings>) => {
    if (settings) {
      setSettings({ ...settings, ...updatedSettings });
    }
  };

  const removeSavedProduct = (productId: string) => {
    setSavedProducts(savedProducts.filter(product => product.id !== productId));
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        stats: {
          ...userProfile.stats,
          savedProducts: userProfile.stats.savedProducts - 1
        }
      });
    }
  };

  const deleteReview = (reviewId: string) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        stats: {
          ...userProfile.stats,
          reviewsWritten: userProfile.stats.reviewsWritten - 1
        }
      });
    }
  };

  const deleteStack = (stackId: string) => {
    setStacks(stacks.filter(stack => stack.id !== stackId));
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        stats: {
          ...userProfile.stats,
          stacksCreated: userProfile.stats.stacksCreated - 1
        }
      });
    }
  };

  const toggleStackVisibility = (stackId: string) => {
    setStacks(stacks.map(stack => 
      stack.id === stackId ? { ...stack, isPublic: !stack.isPublic } : stack
    ));
  };

  return {
    userProfile,
    savedProducts: sortedSavedProducts,
    reviews,
    stacks,
    submissions,
    settings,
    loading,
    activeTab,
    saveSortOption,
    setActiveTab,
    setSaveSortOption,
    updateUserProfile,
    updateSettings,
    removeSavedProduct,
    deleteReview,
    deleteStack,
    toggleStackVisibility,
  };
}
