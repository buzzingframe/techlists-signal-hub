
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Check, X, Edit, Loader2 } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

type SubmissionStatus = "pending" | "approved" | "rejected";

interface Submission {
  id: string;
  name: string;
  submitter: string;
  status: SubmissionStatus;
  submittedAt: string;
  category: string;
  description: string;
}

export function AdminSubmissions() {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const { toast } = useToast();

  const { data: submissions = [], isLoading, error, refetch } = useQuery({
    queryKey: ['product-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching product submissions:", error);
        throw error;
      }

      // Transform the data into the format our component expects
      return data.map(product => ({
        id: product.id,
        name: product.name,
        submitter: product.email || 'Unknown',
        status: product.status || 'pending',
        submittedAt: product.created_at,
        category: product.category,
        description: product.description
      })) as Submission[];
    }
  });

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

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
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Submitter</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.name}</TableCell>
                  <TableCell className="capitalize">{submission.category}</TableCell>
                  <TableCell>{submission.submitter}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {submission.status === "pending" && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleApprove(submission)}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="sr-only">Approve</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleReject(submission)}
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
                        onClick={() => handleEdit(submission)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Submission</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejection. This will be sent to the submitter.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Rejection Reason</Label>
              <Textarea 
                id="rejection-reason" 
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g., Product doesn't meet our guidelines because..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={confirmReject}
              disabled={!rejectionReason.trim()}
            >
              Reject Submission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
