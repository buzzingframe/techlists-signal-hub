
export interface Product {
  id: string;
  name: string;
  category: string;
  signalScore: number;
  logo: string;
  price: "Free" | "$" | "$$" | "Freemium";
  badges: string[];
  description: string;
  website?: string;
  editorialSummary?: string;
  useCase?: string[];
  reviewerPersona?: string;
  features?: ProductFeature[];
  media?: Media[];
}

export interface ProductFeature {
  title: string;
  icon: string;
  description: string;
  expanded?: string;
}

export interface Media {
  type: "image" | "video";
  url: string;
  caption?: string;
}

export interface CuratedList {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  isPinned: boolean;
  coverImage?: string;
  tags: string[];
  productIds: string[];
}
