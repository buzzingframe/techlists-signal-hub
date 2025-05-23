
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Bell, Star, Clock, MessageSquare } from "lucide-react";

interface Step3NotificationsProps {
  notifications: {
    savedProductReviews: boolean;
    weeklyDigest: boolean;
    reviewReplies: boolean;
  };
  onChange: (key: string, value: boolean) => void;
}

export function Step3Notifications({ notifications, onChange }: Step3NotificationsProps) {
  const notificationSettings = [
    {
      id: "savedProductReviews",
      label: "New reviews on saved products",
      description: "Get notified when products you've saved receive new reviews",
      icon: <Star className="w-4 h-4" />,
      checked: notifications.savedProductReviews,
    },
    {
      id: "weeklyDigest",
      label: "Weekly digest of trending tools",
      description: "Receive a weekly roundup of the most popular tools and updates",
      icon: <Clock className="w-4 h-4" />,
      checked: notifications.weeklyDigest,
    },
    {
      id: "reviewReplies",
      label: "Replies to my reviews or mentions",
      description: "Be notified when someone replies to or mentions you",
      icon: <MessageSquare className="w-4 h-4" />,
      checked: notifications.reviewReplies,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Notification Preferences</h2>
        <p className="text-muted-foreground mt-2">
          Choose what you'd like to be notified about.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {notificationSettings.map((setting) => (
          <div
            key={setting.id}
            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
          >
            <Checkbox
              id={setting.id}
              checked={setting.checked}
              onCheckedChange={(checked) => onChange(setting.id, !!checked)}
            />
            <div className="flex flex-col gap-1">
              <Label
                htmlFor={setting.id}
                className="font-medium flex items-center gap-2 cursor-pointer"
              >
                {setting.icon}
                {setting.label}
              </Label>
              <p className="text-sm text-muted-foreground">
                {setting.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
