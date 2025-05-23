
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { SubmissionsTable } from "./submissions/SubmissionsTable";
import { RejectDialog } from "./submissions/RejectDialog";
import { useSubmissions } from "./submissions/useSubmissions";
import { useSubmissionActions } from "./submissions/useSubmissionActions";

export function AdminSubmissions() {
  const { data: submissions = [], isLoading, error, refetch } = useSubmissions();
  
  const {
    selectedSubmission,
    isRejectDialogOpen,
    setIsRejectDialogOpen,
    rejectionReason,
    setRejectionReason,
    handleApprove,
    handleReject,
    confirmReject,
    handleEdit
  } = useSubmissionActions(refetch);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">Loading submissions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
        <p>Error loading submissions. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Product Submissions</h2>
        <Button size="sm" variant="outline">Export CSV</Button>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-md border p-8 text-center">
          <p className="text-muted-foreground">No submissions found.</p>
        </div>
      ) : (
        <SubmissionsTable 
          submissions={submissions}
          onApprove={handleApprove}
          onReject={handleReject}
          onEdit={handleEdit}
        />
      )}

      <RejectDialog
        isOpen={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
        submission={selectedSubmission}
        rejectionReason={rejectionReason}
        onReasonChange={setRejectionReason}
        onConfirm={confirmReject}
      />
    </div>
  );
}
