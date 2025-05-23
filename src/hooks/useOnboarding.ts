
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useOnboarding(userId?: string) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      checkOnboardingStatus();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const checkOnboardingStatus = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('has_completed_onboarding')
        .eq('id', userId)
        .single();

      if (error) throw error;
      
      // If has_completed_onboarding is false or null, show onboarding
      setShowOnboarding(data?.has_completed_onboarding !== true);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async () => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ has_completed_onboarding: true })
        .eq('id', userId);

      if (error) throw error;
      
      setShowOnboarding(false);
    } catch (error) {
      console.error('Error updating onboarding status:', error);
    }
  };

  const resetOnboarding = () => {
    setShowOnboarding(true);
  };

  return {
    showOnboarding,
    loading,
    completeOnboarding,
    resetOnboarding,
  };
}
