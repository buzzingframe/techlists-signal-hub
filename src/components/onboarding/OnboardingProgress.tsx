
import { useOnboarding } from "@/contexts/OnboardingContext";

export function OnboardingProgress() {
  const { step, totalSteps } = useOnboarding();
  
  return (
    <div className="flex items-center mb-6">
      <div className="w-full bg-muted h-1.5 rounded-full">
        <div 
          className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>
      <span className="ml-2 text-sm text-muted-foreground">
        {step}/{totalSteps}
      </span>
    </div>
  );
}
