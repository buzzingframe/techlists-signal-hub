
import { Button } from "@/components/ui/button";
import { Check, X, Edit } from "lucide-react";
import { Submission } from "./types";

interface SubmissionActionsProps {
  submission: Submission;
  onApprove: (submission: Submission) => void;
  onReject: (submission: Submission) => void;
  onEdit: (submission: Submission) => void;
}

export function SubmissionActions({ submission, onApprove, onReject, onEdit }: SubmissionActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      {submission.status === "pending" && (
        <>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onApprove(submission)}
          >
            <Check className="h-4 w-4 text-green-600" />
            <span className="sr-only">Approve</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onReject(submission)}
          >
            <X className="h-4 w-4 text-red-600" />
            <span className="sr-only">Reject</span>
          </Button>
        </>
      )}
      <Button 
        variant="ghost" 
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => onEdit(submission)}
      >
        <Edit className="h-4 w-4" />
        <span className="sr-only">Edit</span>
      </Button>
    </div>
  );
}
