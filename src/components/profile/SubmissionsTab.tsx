
import { UserSubmission } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Upload, ArrowUpRight, Edit, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface SubmissionsTabProps {
  submissions: UserSubmission[];
}

export function SubmissionsTab({ submissions }: SubmissionsTabProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">My Submissions</h2>
        <Button asChild>
          <Link to="/submit">
            <Upload className="h-4 w-4 mr-1" />
            Submit New
          </Link>
        </Button>
      </div>

      {submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{submission.productName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Submitted {formatDistanceToNow(new Date(submission.submittedAt), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(submission.status)}
                    
                    <div className="flex gap-2">
                      {submission.status === "approved" && submission.productId ? (
                        <Button variant="outline" size="sm" className="h-8" asChild>
                          <Link to={`/product/${submission.productId}`}>
                            <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                            View
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="h-8">
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Upload className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No submissions yet</h3>
            <CardDescription className="text-center">
              Help the community by submitting products you find valuable.
            </CardDescription>
            <Button className="mt-4" asChild>
              <Link to="/submit">Submit a Product</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
