
export interface Notification {
  id: string;
  type: 'review_reply' | 'mention' | 'submission_status' | 'product_review' | 'system';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}
