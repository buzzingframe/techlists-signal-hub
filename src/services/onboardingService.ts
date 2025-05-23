
import { UserInterest, UserPreferences, UserRole } from "@/types/user";
import { supabase } from "@/integrations/supabase/client";

export async function saveUserPreferences(userId: string, preferences: UserPreferences): Promise<{error: Error | null}> {
  try {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userId,
        interests: preferences.interests,
        role: preferences.role,
      });
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error saving user preferences:", error);
    return { error: error as Error };
  }
}

export async function saveNotificationSettings(
  userId: string, 
  notifications: {
    savedProductReviews: boolean;
    weeklyDigest: boolean;
    reviewReplies: boolean;
  }
): Promise<{error: Error | null}> {
  try {
    const { error } = await supabase
      .from('notification_preferences')
      .upsert({
        user_id: userId,
        saved_product_reviews: notifications.savedProductReviews,
        weekly_digest: notifications.weeklyDigest,
        review_replies: notifications.reviewReplies,
      });
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error saving notification settings:", error);
    return { error: error as Error };
  }
}

export async function updateOnboardingStatus(
  userId: string, 
  completed: boolean
): Promise<{error: Error | null}> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        id: userId,
        has_completed_onboarding: completed,
      });
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error("Error updating onboarding status:", error);
    return { error: error as Error };
  }
}
