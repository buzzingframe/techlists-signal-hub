
import { AdminDataSetup } from "@/components/admin/AdminDataSetup";
import { RealReviewsManager } from "@/components/admin/review/RealReviewsManager";

export function AdminReviewsReal() {
  return (
    <div className="space-y-6">
      <AdminDataSetup />
      <RealReviewsManager />
    </div>
  );
}
