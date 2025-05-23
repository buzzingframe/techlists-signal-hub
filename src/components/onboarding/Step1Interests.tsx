
import { UserInterest } from "@/types/user";
import { InterestHeader } from "./interest/InterestHeader";
import { InterestGrid } from "./interest/InterestGrid";
import { interests } from "./interest/interestData";

interface Step1InterestsProps {
  selectedInterests: UserInterest[];
  onChange: (interests: UserInterest[]) => void;
}

export function Step1Interests({ selectedInterests, onChange }: Step1InterestsProps) {
  const toggleInterest = (interest: UserInterest) => {
    if (selectedInterests.includes(interest)) {
      onChange(selectedInterests.filter(i => i !== interest));
    } else {
      onChange([...selectedInterests, interest]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <InterestHeader />
      <InterestGrid 
        interests={interests}
        selectedInterests={selectedInterests}
        onToggle={toggleInterest}
      />
    </div>
  );
}
