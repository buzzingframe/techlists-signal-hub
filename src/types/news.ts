
export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tag: NewsTag;
  bannerImage?: string;
  author?: string;
  readTime: string;
  publishedAt: string;
  relatedArticleIds?: string[];
  relatedProductIds?: string[];
}

export type NewsTag = 
  | "announcement" 
  | "trend" 
  | "launch" 
  | "security"
  | "infrastructure" 
  | "nfts" 
  | "defi"
  | "opinion"
  | "guide"
  | "weekly-recap";

export interface NewsTagInfo {
  value: NewsTag;
  label: string;
  color: string;
}

export const NEWS_TAGS: NewsTagInfo[] = [
  { value: "announcement", label: "Announcement", color: "blue" },
  { value: "trend", label: "Trend", color: "purple" },
  { value: "launch", label: "Launch", color: "green" },
  { value: "security", label: "Security", color: "red" },
  { value: "infrastructure", label: "Infrastructure", color: "orange" },
  { value: "nfts", label: "NFTs", color: "pink" },
  { value: "defi", label: "DeFi", color: "cyan" },
  { value: "opinion", label: "Opinion", color: "yellow" },
  { value: "guide", label: "Guide", color: "emerald" },
  { value: "weekly-recap", label: "Weekly Recap", color: "indigo" }
];
