
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UserPreferences } from '@/types/user';

interface OnboardingState {
  isOpen: boolean;
  hasCompleted: boolean;
  isLoading: boolean;
}

export const useOnboarding = (userId?: string) => {
  const [state, setState] = useState<OnboardingState>({
    isOpen: false,
    hasCompleted: true, // Default to true to prevent showing until we know
    isLoading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (userId) {
      // Check if user has completed onboarding
      checkOnboardingStatus();
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [userId]);

  const checkOnboardingStatus = async () => {
    try {
      // Temporarily replaced with mock implementation
      console.log("Would check onboarding status for user:", userId);
      
      // Mock response - in real implementation, this would come from Supabase
      const hasCompleted = localStorage.getItem(`onboarding-${userId}`) === 'completed';
      
      setState({
        isOpen: !hasCompleted,
        hasCompleted,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setState({
        isOpen: false,
        hasCompleted: true, // Default to true in case of error
        isLoading: false,
      });
    }
  };

  const completeOnboarding = async () => {
    try {
      // Temporarily replaced with mock implementation
      console.log("Would mark onboarding as completed for user:", userId);
      
      // Store in localStorage for our mock implementation
      if (userId) {
        localStorage.setItem(`onboarding-${userId}`, 'completed');
      }
      
      setState(prev => ({
        ...prev,
        isOpen: false,
        hasCompleted: true,
      }));
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: 'Error',
        description: 'Failed to save onboarding status. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const openOnboarding = () => {
    setState(prev => ({ ...prev, isOpen: true }));
  };

  const closeOnboarding = () => {
    setState(prev => ({ ...prev, isOpen: false }));
  };

  return {
    isOnboardingOpen: state.isOpen,
    hasCompletedOnboarding: state.hasCompleted,
    isLoading: state.isLoading,
    openOnboarding,
    closeOnboarding,
    completeOnboarding,
  };
};
