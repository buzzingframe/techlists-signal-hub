
import { UserInterest } from "@/types/user";

export interface InterestOption {
  id: UserInterest;
  label: string;
  icon: string;
}

export const interests: InterestOption[] = [
  { id: "wallets", label: "Wallets", icon: "💼" },
  { id: "dao_tools", label: "DAO Tools", icon: "🏛️" },
  { id: "nft_utilities", label: "NFT Utilities", icon: "🖼️" },
  { id: "developer_infra", label: "Developer Infra", icon: "🛠️" },
  { id: "defi", label: "DeFi / Yield Tools", icon: "💰" },
  { id: "security", label: "Security & Privacy", icon: "🔒" },
  { id: "analytics", label: "Data & Analytics", icon: "📊" },
  { id: "identity", label: "Identity & Reputation", icon: "🪪" },
];
