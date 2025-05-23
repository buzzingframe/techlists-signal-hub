
import { supabase } from "@/integrations/supabase/client";
import { UserInterest, UserPreferences, UserRole } from "@/types/user";

export const saveUserPreferences = async (userId: string, preferences: UserPreferences) => {
  try {
    // Instead of directly using tables that might not exist in the Supabase schema,
    // we'll use localStorage as a fallback for this refactoring
    localStorage.setItem(`user-preferences-${userId}`, JSON.stringify({
      interests: preferences.interests,
      role: preferences.role,
    }));

    // Return a mock successful response
    return { status: 200 };
  } catch (error) {
    console.error("Error saving user preferences:", error);
    throw error;
  }
};

export const saveNotificationSettings = async (
  userId: string,
  notifications: { 
    savedProductReviews: boolean; 
    weeklyDigest: boolean; 
    reviewReplies: boolean;
  }
) => {
  try {
    // Use localStorage as a fallback 
    localStorage.setItem(`user-notifications-${userId}`, JSON.stringify({
      savedProductReviews: notifications.savedProductReviews,
      weeklyDigest: notifications.weeklyDigest,
      reviewReplies: notifications.reviewReplies,
    }));

    // Return a mock successful response
    return { status: 200 };
  } catch (error) {
    console.error("Error saving notification settings:", error);
    throw error;
  }
};

export const updateOnboardingStatus = async (userId: string, hasCompleted: boolean) => {
  try {
    // Use localStorage for now
    localStorage.setItem(`onboarding-${userId}`, hasCompleted ? 'completed' : 'pending');
    
    // Return a mock successful response
    return { status: 200 };
  } catch (error) {
    console.error("Error updating onboarding status:", error);
    throw error;
  }
};
