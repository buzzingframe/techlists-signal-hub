
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { OnboardingProgress } from "./OnboardingProgress";
import { OnboardingContent } from "./OnboardingContent";
import { OnboardingNavigation } from "./OnboardingNavigation";
import { saveUserPreferences, saveNotificationSettings, updateOnboardingStatus } from "@/services/onboardingService";
import { UserPreferences } from "@/types/user";

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  onComplete?: () => void;
}

export function OnboardingFlow({ isOpen, onClose, userId, onComplete }: OnboardingFlowProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Use the authenticated user ID if available
  const effectiveUserId = userId || user?.id;

  const handleSkip = () => {
    if (effectiveUserId) {
      // Mark onboarding as completed even if skipped
      updateOnboardingStatus(effectiveUserId, true);
    }
    onClose();
  };

  const handleComplete = async (
    preferences: UserPreferences,
    notifications: { 
      savedProductReviews: boolean; 
      weeklyDigest: boolean; 
      reviewReplies: boolean;
    }
  ) => {
    if (!effectiveUserId) {
      // If no userId (preview mode), just close
      onComplete?.();
      onClose();
      return;
    }
    
    try {
      // Save all preferences and settings
      await saveUserPreferences(effectiveUserId, preferences);
      await saveNotificationSettings(effectiveUserId, notifications);
      await updateOnboardingStatus(effectiveUserId, true);
      
      toast({
        title: "Onboarding complete!",
        description: "Your preferences have been saved.",
      });

      onComplete?.();
      onClose();
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Error",
        description: "Failed to save your preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DrawerContent className="max-h-[90vh]">
            <div className="p-6">
              <OnboardingContainer onSkip={handleSkip} onComplete={handleComplete} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
            <div className="p-6">
              <OnboardingContainer onSkip={handleSkip} onComplete={handleComplete} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

interface OnboardingContainerProps {
  onSkip: () => void;
  onComplete: (
    preferences: UserPreferences,
    notifications: { 
      savedProductReviews: boolean; 
      weeklyDigest: boolean; 
      reviewReplies: boolean;
    }
  ) => void;
}

function OnboardingContainer({ onSkip, onComplete }: OnboardingContainerProps) {
  return (
    <OnboardingProvider>
      <OnboardingContent2 onSkip={onSkip} onComplete={onComplete} />
    </OnboardingProvider>
  );
}

function OnboardingContent2({ onSkip, onComplete }: OnboardingContainerProps) {
  const { preferences, notifications } = useOnboarding();
  
  const handleCompleteClick = () => {
    onComplete(preferences, notifications);
  };

  return (
    <div className="flex flex-col">
      <OnboardingProgress />
      <OnboardingContent />
      <OnboardingNavigation onSkip={onSkip} onComplete={handleCompleteClick} />
    </div>
  );
}
