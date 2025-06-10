
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="text-xl font-bold">TechLists</span>
      <Badge>Beta</Badge>
    </Link>
  );
}
