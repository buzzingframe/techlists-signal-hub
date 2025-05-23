
export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Submission {
  id: string;
  name: string;
  submitter: string;
  status: SubmissionStatus;
  submittedAt: string;
  category: string;
  description: string;
}
