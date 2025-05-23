
import { createContext, useContext, useState } from "react";
import { UserInterest, UserPreferences, UserRole } from "@/types/user";

interface OnboardingContextType {
  step: number;
  totalSteps: number;
  preferences: UserPreferences;
  notifications: {
    savedProductReviews: boolean;
    weeklyDigest: boolean;
    reviewReplies: boolean;
  };
  setStep: (step: number) => void;
  handleInterestsChange: (interests: UserInterest[]) => void;
  handleRoleChange: (role: UserRole) => void;
  handleNotificationChange: (key: string, value: boolean) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

interface OnboardingProviderProps {
  children: React.ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: [],
    role: "explorer",
  });
  const [notifications, setNotifications] = useState({
    savedProductReviews: true,
    weeklyDigest: true,
    reviewReplies: true,
  });
  
  const totalSteps = 4;

  const handleInterestsChange = (interests: UserInterest[]) => {
    setPreferences(prev => ({ ...prev, interests }));
  };

  const handleRoleChange = (role: UserRole) => {
    setPreferences(prev => ({ ...prev, role }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const value = {
    step,
    totalSteps,
    preferences,
    notifications,
    setStep,
    handleInterestsChange,
    handleRoleChange,
    handleNotificationChange,
    handleNext,
    handleBack,
  };

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
