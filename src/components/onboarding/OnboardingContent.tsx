
import { Step1Interests } from "./Step1Interests";
import { Step2Role } from "./Step2Role";
import { Step3Notifications } from "./Step3Notifications";
import { Step4Confirmation } from "./Step4Confirmation";
import { useOnboarding } from "@/contexts/OnboardingContext";

export function OnboardingContent() {
  const { step, preferences, notifications, handleInterestsChange, handleRoleChange, handleNotificationChange } = useOnboarding();

  return (
    <div className="min-h-[400px]">
      {step === 1 && (
        <Step1Interests 
          selectedInterests={preferences.interests}
          onChange={handleInterestsChange}
        />
      )}
      
      {step === 2 && (
        <Step2Role 
          selectedRole={preferences.role}
          onChange={handleRoleChange}
        />
      )}
      
      {step === 3 && (
        <Step3Notifications 
          notifications={notifications}
          onChange={handleNotificationChange}
        />
      )}
      
      {step === 4 && (
        <Step4Confirmation 
          preferences={preferences}
        />
      )}
    </div>
  );
}
