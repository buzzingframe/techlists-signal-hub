
import { useState, useEffect } from "react";
import { CuratedList } from "@/types/product";

// Mock data for development purposes
const mockLists: CuratedList[] = [
  {
    id: "best-wallet-tools",
    title: "Best Wallet Tools for 2025",
    description: "Our top picks for managing your crypto across chains with maximum security and convenience.",
    createdAt: "2025-04-12T10:30:00Z",
    updatedAt: "2025-05-10T15:45:00Z",
    createdBy: "Alex Chen",
    isPinned: true,
    coverImage: "https://via.placeholder.com/800x400",
    tags: ["Wallets", "Security", "Multi-chain"],
    productIds: ["web3auth", "metamask", "rainbow"]
  },
  {
    id: "dao-essentials",
    title: "DAO Essential Stack",
    description: "The fundamental tools every new DAO needs for governance, treasury management, and coordination.",
    createdAt: "2025-03-22T14:20:00Z",
    updatedAt: "2025-05-05T09:15:00Z",
    createdBy: "Jamie Smith",
    isPinned: false,
    tags: ["DAOs", "Governance", "Treasury"],
    productIds: ["snapshot", "coordinape", "llama"]
  },
  {
    id: "nft-creator-toolkit",
    title: "NFT Creator Toolkit",
    description: "Everything you need to design, mint, and distribute your NFT collection.",
    createdAt: "2025-02-18T11:10:00Z",
    updatedAt: "2025-04-30T16:40:00Z",
    createdBy: "Sarah Wang",
    isPinned: true,
    coverImage: "https://via.placeholder.com/800x400",
    tags: ["NFTs", "Creation", "Distribution"],
    productIds: ["manifold", "opensea", "zora"]
  }
];

export function useCuratedLists() {
  const [lists, setLists] = useState<CuratedList[]>([]);
  const [isAdmin, setIsAdmin] = useState(true); // This would normally be determined by auth/role check
  
  useEffect(() => {
    // In a real app, we would fetch from Supabase here
    setLists(mockLists);
  }, []);

  return { lists, isAdmin };
}
