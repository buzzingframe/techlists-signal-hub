
import { UserPreferences } from "@/types/user";
import { Sparkles } from "lucide-react";

interface Step4ConfirmationProps {
  preferences: UserPreferences;
}

export function Step4Confirmation({ preferences }: Step4ConfirmationProps) {
  // Map role to a friendly display name
  const roleDisplayNames: Record<string, string> = {
    developer: "Developer",
    founder: "Founder / Project Lead",
    researcher: "Researcher",
    trader: "Trader",
    explorer: "Curious Explorer",
  };

  // Map interests to friendly display names
  const interestDisplayNames: Record<string, string> = {
    wallets: "Wallets",
    dao_tools: "DAO Tools",
    nft_utilities: "NFT Utilities",
    developer_infra: "Developer Infrastructure",
    defi: "DeFi & Yield Tools",
    security: "Security & Privacy",
    analytics: "Data & Analytics",
    identity: "Identity & Reputation",
  };

  // Count selected interests
  const interestCount = preferences.interests.length;

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold">You're all set!</h2>
        <p className="text-muted-foreground mt-2">
          We've personalized your experience based on your preferences.
        </p>
      </div>

      <div className="bg-muted/50 p-6 rounded-lg space-y-4">
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">ROLE</h3>
          <p className="font-medium text-lg">
            {roleDisplayNames[preferences.role] || preferences.role}
          </p>
        </div>
        
        <div>
          <h3 className="font-medium text-sm text-muted-foreground">INTERESTS</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {preferences.interests.length > 0 ? (
              preferences.interests.map((interest) => (
                <div 
                  key={interest} 
                  className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                >
                  {interestDisplayNames[interest] || interest}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No specific interests selected</p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <p className="text-center text-sm text-muted-foreground">
            You can always update these preferences later in your profile settings.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3 text-center">
          Recommended for You
        </h3>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
          <p className="font-medium">
            {interestCount > 0 ? (
              `Top tools for ${roleDisplayNames[preferences.role]} focusing on ${interestDisplayNames[preferences.interests[0]]}`
            ) : (
              `Popular tools for ${roleDisplayNames[preferences.role]}`
            )}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Discover personalized recommendations based on your preferences
          </p>
        </div>
      </div>
    </div>
  );
}
