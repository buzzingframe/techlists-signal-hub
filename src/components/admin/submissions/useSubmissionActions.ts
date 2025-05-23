
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Submission } from "./types";

export function useSubmissionActions(refetch: () => void) {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const { toast } = useToast();

  const handleApprove = async (submission: Submission) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ 
          status: 'approved',
          badges: ['approved']
        })
        .eq('id', submission.id);
        
      if (error) throw error;
      
      toast({
        title: "Submission approved",
        description: `${submission.name} has been published to the site.`
      });
      
      refetch();
    } catch (error) {
      console.error("Error approving submission:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem approving the submission."
      });
    }
  };

  const handleReject = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsRejectDialogOpen(true);
  };

  const confirmReject = async () => {
    if (!selectedSubmission) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .update({ 
          status: 'rejected',
          rejection_reason: rejectionReason
        })
        .eq('id', selectedSubmission.id);
        
      if (error) throw error;
      
      toast({
        title: "Submission rejected",
        description: `${selectedSubmission.name} has been rejected.`
      });
      
      setIsRejectDialogOpen(false);
      setRejectionReason("");
      setSelectedSubmission(null);
      refetch();
    } catch (error) {
      console.error("Error rejecting submission:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem rejecting the submission."
      });
    }
  };

  const handleEdit = (submission: Submission) => {
    // In a real app, this would open an edit modal
    toast({
      title: "Edit submission",
      description: `Editing ${submission.name} (feature not implemented in this demo)`
    });
  };

  return {
    selectedSubmission,
    isRejectDialogOpen,
    setIsRejectDialogOpen,
    rejectionReason,
    setRejectionReason,
    handleApprove,
    handleReject,
    confirmReject,
    handleEdit
  };
}
