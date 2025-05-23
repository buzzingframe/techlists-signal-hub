
import { FlagReason } from "@/types/review";

export function getFlagBadgeColor(reason: FlagReason) {
  switch (reason) {
    case "inappropriate":
      return "destructive" as const;
    case "spam":
      return "orange" as const;
    case "duplicate":
      return "purple" as const;
    case "false_information":
      return "yellow" as const;
    case "off_topic":
      return "green" as const;
    default:
      return "secondary" as const;
  }
}
