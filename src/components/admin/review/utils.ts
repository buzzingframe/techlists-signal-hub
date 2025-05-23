
import { FlagReason } from "@/types/review";

export function getFlagBadgeColor(reason: FlagReason) {
  switch (reason) {
    case "inappropriate":
      return "destructive" as const;
    case "spam":
      return "secondary" as const;
    case "duplicate":
      return "outline" as const;
    default:
      return "secondary" as const;
  }
}
