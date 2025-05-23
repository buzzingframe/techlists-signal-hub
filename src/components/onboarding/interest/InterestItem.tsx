
import { UserInterest } from "@/types/user";
import { Check } from "lucide-react";

interface InterestItemProps {
  id: UserInterest;
  label: string;
  icon: string;
  isSelected: boolean;
  onToggle: (interest: UserInterest) => void;
}

export function InterestItem({ id, label, icon, isSelected, onToggle }: InterestItemProps) {
  return (
    <div
      className={`
        relative rounded-xl border-2 p-4 cursor-pointer transition-all hover:border-blue-500/50
        ${isSelected ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-muted bg-background'}
      `}
      onClick={() => onToggle(id)}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
      <div className="flex flex-col items-center text-center gap-2">
        <span className="text-2xl">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
}
