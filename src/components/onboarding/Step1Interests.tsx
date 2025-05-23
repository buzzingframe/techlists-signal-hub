
import { useState } from "react";
import { UserInterest } from "@/types/user";
import { Check } from "lucide-react";

interface Step1InterestsProps {
  selectedInterests: UserInterest[];
  onChange: (interests: UserInterest[]) => void;
}

export function Step1Interests({ selectedInterests, onChange }: Step1InterestsProps) {
  const interests: { id: UserInterest; label: string; icon: string }[] = [
    { id: "wallets", label: "Wallets", icon: "💼" },
    { id: "dao_tools", label: "DAO Tools", icon: "🏛️" },
    { id: "nft_utilities", label: "NFT Utilities", icon: "🖼️" },
    { id: "developer_infra", label: "Developer Infra", icon: "🛠️" },
    { id: "defi", label: "DeFi / Yield Tools", icon: "💰" },
    { id: "security", label: "Security & Privacy", icon: "🔒" },
    { id: "analytics", label: "Data & Analytics", icon: "📊" },
    { id: "identity", label: "Identity & Reputation", icon: "🪪" },
  ];

  const toggleInterest = (interest: UserInterest) => {
    if (selectedInterests.includes(interest)) {
      onChange(selectedInterests.filter(i => i !== interest));
    } else {
      onChange([...selectedInterests, interest]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold">What are you interested in?</h2>
        <p className="text-muted-foreground mt-2">
          Select categories to help us personalize your experience.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {interests.map((interest) => {
          const isSelected = selectedInterests.includes(interest.id);
          
          return (
            <div
              key={interest.id}
              className={`
                relative rounded-xl border-2 p-4 cursor-pointer transition-all hover:border-blue-500/50
                ${isSelected ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-muted bg-background'}
              `}
              onClick={() => toggleInterest(interest.id)}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
              <div className="flex flex-col items-center text-center gap-2">
                <span className="text-2xl">{interest.icon}</span>
                <span className="font-medium">{interest.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
