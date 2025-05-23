
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Submission } from "./types";

interface RejectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  submission: Submission | null;
  rejectionReason: string;
  onReasonChange: (reason: string) => void;
  onConfirm: () => void;
}

export function RejectDialog({
  isOpen,
  onOpenChange,
  submission,
  rejectionReason,
  onReasonChange,
  onConfirm
}: RejectDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              onChange={(e) => onReasonChange(e.target.value)}
              placeholder="e.g., Product doesn't meet our guidelines because..."
              className="min-h-[100px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            variant="destructive" 
            onClick={onConfirm}
            disabled={!rejectionReason.trim()}
          >
            Reject Submission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
