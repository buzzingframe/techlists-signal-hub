
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OnboardingFlow } from "../onboarding/OnboardingFlow";
import { Sparkles } from "lucide-react";

interface RestartOnboardingButtonProps {
  userId: string;
}

export function RestartOnboardingButton({ userId }: RestartOnboardingButtonProps) {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <>
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => setShowOnboarding(true)}
      >
        <Sparkles className="h-4 w-4" />
        Update Interests
      </Button>

      <OnboardingFlow
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        userId={userId}
      />
    </>
  );
}
