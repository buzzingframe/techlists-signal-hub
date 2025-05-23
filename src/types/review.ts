
export interface Review {
  id: string;
  product_id: string;
  user_id?: string;
  score: number;
  pros: string;
  cons: string;
  verdict?: string;
  reviewer_type: 'web3_developer' | 'founder' | 'power_user' | 'casual_user' | 'reviewer';
  pricing_feedback: 'got_free' | 'paid' | 'would_pay' | 'not_worth';
  compared_product?: string;
  status: 'active' | 'needs_moderation' | 'rejected';
  created_at: string;
  updated_at: string;
  flagReason?: FlagReason;
  flaggedAt?: string;
}

export type FlagReason = 
  | "inappropriate"
  | "spam"
  | "duplicate"
  | "off-topic"
  | "other";
