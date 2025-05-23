
import { useState } from "react";
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
import { Check, X, Edit } from "lucide-react";
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

// Mock submission data
const mockSubmissions = [
  {
    id: "1",
    name: "CryptoWallet Pro",
    submitter: "alex@example.com",
    status: "pending",
    submittedAt: "2025-05-21T12:30:00Z",
    category: "wallet",
    description: "A secure and user-friendly crypto wallet with multi-chain support."
  },
  {
    id: "2",
    name: "DeFi Dashboard",
    submitter: "maria@example.com",
    status: "pending",
    submittedAt: "2025-05-20T09:15:00Z",
    category: "defi",
    description: "All-in-one dashboard for tracking your DeFi investments across protocols."
  },
  {
    id: "3",
    name: "NFT Explorer",
    submitter: "james@example.com",
    status: "approved",
    submittedAt: "2025-05-19T15:45:00Z",
    category: "nft",
    description: "Discover and track NFT collections across multiple marketplaces."
  },
  {
    id: "4",
    name: "DAO Governance",
    submitter: "sarah@example.com",
    status: "rejected",
    submittedAt: "2025-05-18T11:20:00Z",
    category: "dao",
    description: "Simplified governance interface for DAOs with voting analytics."
  },
  {
    id: "5",
    name: "Blockchain Explorer",
    submitter: "dev@example.com",
    status: "pending",
    submittedAt: "2025-05-17T14:10:00Z",
    category: "development",
    description: "Developer-focused blockchain explorer with advanced transaction tracing."
  }
];

type Submission = typeof mockSubmissions[0];
type SubmissionStatus = "pending" | "approved" | "rejected";

export function AdminSubmissions() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const { toast } = useToast();

  const handleApprove = (submission: Submission) => {
    setSubmissions(submissions.map(s => 
      s.id === submission.id ? { ...s, status: "approved" as SubmissionStatus } : s
    ));
    
    toast({
      title: "Submission approved",
      description: `${submission.name} has been published to the site.`
    });
  };

  const handleReject = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsRejectDialogOpen(true);
  };

  const confirmReject = () => {
    if (!selectedSubmission) return;
    
    setSubmissions(submissions.map(s => 
      s.id === selectedSubmission.id ? { ...s, status: "rejected" as SubmissionStatus } : s
    ));
    
    toast({
      title: "Submission rejected",
      description: `${selectedSubmission.name} has been rejected.`
    });
    
    setIsRejectDialogOpen(false);
    setRejectionReason("");
    setSelectedSubmission(null);
  };

  const handleEdit = (submission: Submission) => {
    // In a real app, this would open an edit modal
    toast({
      title: "Edit submission",
      description: `Editing ${submission.name} (feature not implemented in this demo)`
    });
  };

  const getStatusBadge = (status: SubmissionStatus) => {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Product Submissions</h2>
        <Button size="sm" variant="outline">Export CSV</Button>
      </div>

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
                <TableCell>{getStatusBadge(submission.status as SubmissionStatus)}</TableCell>
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
