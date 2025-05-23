
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Step1Interests } from "@/components/onboarding/Step1Interests";
import { Step2Role } from "@/components/onboarding/Step2Role";
import { Step3Notifications } from "@/components/onboarding/Step3Notifications";
import { Step4Confirmation } from "@/components/onboarding/Step4Confirmation";
import { useIsMobile } from "@/hooks/use-mobile";
import { UserInterest, UserPreferences, UserRole } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  onComplete?: () => void;
}

export function OnboardingFlow({ isOpen, onClose, userId, onComplete }: OnboardingFlowProps) {
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
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const totalSteps = 4;

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

  const handleInterestsChange = (interests: UserInterest[]) => {
    setPreferences(prev => ({ ...prev, interests }));
  };

  const handleRoleChange = (role: UserRole) => {
    setPreferences(prev => ({ ...prev, role }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSkip = () => {
    if (userId) {
      // Mark onboarding as completed even if skipped
      updateUserOnboardingStatus(true);
    }
    onClose();
  };

  const handleComplete = async () => {
    if (userId) {
      try {
        // Save all preferences and settings
        await savePreferences();
        await saveNotificationSettings();
        await updateUserOnboardingStatus(true);
        
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
    } else {
      // If no userId (preview mode), just close
      onComplete?.();
      onClose();
    }
  };

  const savePreferences = async () => {
    if (!userId) return;

    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        interests: preferences.interests,
        role: preferences.role,
      });

    if (error) throw error;
  };

  const saveNotificationSettings = async () => {
    if (!userId) return;

    const { error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: userId,
        notification_preferences: {
          savedProductReviews: notifications.savedProductReviews,
          weeklyDigest: notifications.weeklyDigest,
          reviewReplies: notifications.reviewReplies,
        }
      });

    if (error) throw error;
  };

  const updateUserOnboardingStatus = async (completed: boolean) => {
    if (!userId) return;

    const { error } = await supabase
      .from('profiles')
      .update({ has_completed_onboarding: completed })
      .eq('id', userId);

    if (error) throw error;
  };

  // Determine which container to use based on device
  const Container = isMobile ? Drawer : Dialog;
  const Content = isMobile ? DrawerContent : DialogContent;

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DrawerContent className="max-h-[90vh]">
            <div className="p-6">
              <OnboardingContent
                step={step}
                totalSteps={totalSteps}
                preferences={preferences}
                notifications={notifications}
                onInterestsChange={handleInterestsChange}
                onRoleChange={handleRoleChange}
                onNotificationChange={handleNotificationChange}
                onNext={handleNext}
                onBack={handleBack}
                onSkip={handleSkip}
                onComplete={handleComplete}
              />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
            <div className="p-6">
              <OnboardingContent
                step={step}
                totalSteps={totalSteps}
                preferences={preferences}
                notifications={notifications}
                onInterestsChange={handleInterestsChange}
                onRoleChange={handleRoleChange}
                onNotificationChange={handleNotificationChange}
                onNext={handleNext}
                onBack={handleBack}
                onSkip={handleSkip}
                onComplete={handleComplete}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

interface OnboardingContentProps {
  step: number;
  totalSteps: number;
  preferences: UserPreferences;
  notifications: {
    savedProductReviews: boolean;
    weeklyDigest: boolean;
    reviewReplies: boolean;
  };
  onInterestsChange: (interests: UserInterest[]) => void;
  onRoleChange: (role: UserRole) => void;
  onNotificationChange: (key: string, value: boolean) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

function OnboardingContent({
  step,
  totalSteps,
  preferences,
  notifications,
  onInterestsChange,
  onRoleChange,
  onNotificationChange,
  onNext,
  onBack,
  onSkip,
  onComplete,
}: OnboardingContentProps) {
  return (
    <div className="flex flex-col">
      {/* Progress indicator */}
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

      {/* Step content */}
      <div className="min-h-[400px]">
        {step === 1 && (
          <Step1Interests 
            selectedInterests={preferences.interests}
            onChange={onInterestsChange}
          />
        )}
        
        {step === 2 && (
          <Step2Role 
            selectedRole={preferences.role}
            onChange={onRoleChange}
          />
        )}
        
        {step === 3 && (
          <Step3Notifications 
            notifications={notifications}
            onChange={onNotificationChange}
          />
        )}
        
        {step === 4 && (
          <Step4Confirmation 
            preferences={preferences}
          />
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6 pt-4 border-t">
        <div>
          {step > 1 ? (
            <Button variant="outline" onClick={onBack}>
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
            <Button onClick={onNext}>
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
    </div>
  );
}
