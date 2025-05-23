
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { SubmissionStatusBadge } from "./SubmissionStatusBadge";
import { SubmissionActions } from "./SubmissionActions";
import { Submission } from "./types";

interface SubmissionsTableProps {
  submissions: Submission[];
  onApprove: (submission: Submission) => void;
  onReject: (submission: Submission) => void;
  onEdit: (submission: Submission) => void;
}

export function SubmissionsTable({ submissions, onApprove, onReject, onEdit }: SubmissionsTableProps) {
  return (
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
              <TableCell><SubmissionStatusBadge status={submission.status} /></TableCell>
              <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <SubmissionActions 
                  submission={submission}
                  onApprove={onApprove}
                  onReject={onReject}
                  onEdit={onEdit}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
