
import { UserInterest } from "@/types/user";
import { InterestItem } from "./InterestItem";
import { InterestOption } from "./interestData";

interface InterestGridProps {
  interests: InterestOption[];
  selectedInterests: UserInterest[];
  onToggle: (interest: UserInterest) => void;
}

export function InterestGrid({ interests, selectedInterests, onToggle }: InterestGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {interests.map((interest) => (
        <InterestItem
          key={interest.id}
          id={interest.id}
          label={interest.label}
          icon={interest.icon}
          isSelected={selectedInterests.includes(interest.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
