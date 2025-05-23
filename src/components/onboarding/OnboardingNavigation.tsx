
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

interface OnboardingNavigationProps {
  onSkip: () => void;
  onComplete: () => void;
}

export function OnboardingNavigation({ onSkip, onComplete }: OnboardingNavigationProps) {
  const { step, totalSteps, handleNext, handleBack } = useOnboarding();

  return (
    <div className="flex justify-between mt-6 pt-4 border-t">
      <div>
        {step > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <Button variant="outline" onClick={onSkip}>
            Skip for now
          </Button>
        )}
      </div>
      <div>
        {step < totalSteps ? (
          <Button onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            onClick={onComplete}
          >
            Start Exploring
          </Button>
        )}
      </div>
    </div>
  );
}
