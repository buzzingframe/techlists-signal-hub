
import { useState } from "react";
import { UserSettings } from "@/types/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SettingsTabProps {
  settings: UserSettings;
  username: string;
  avatarUrl?: string;
  onUpdateSettings: (settings: Partial<UserSettings>) => void;
}

export function SettingsTab({
  settings,
  username,
  avatarUrl,
  onUpdateSettings,
}: SettingsTabProps) {
  const [formValues, setFormValues] = useState({
    username: username,
    bio: "",
    email: settings.connectedAccounts.email || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = (key: string, section: string, value: boolean) => {
    if (section === "notificationPreferences") {
      onUpdateSettings({
        notificationPreferences: {
          ...settings.notificationPreferences,
          [key]: value,
        },
      });
    } else if (section === "privacySettings") {
      onUpdateSettings({
        privacySettings: {
          ...settings.privacySettings,
          [key]: value,
        },
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and how others see you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={avatarUrl} alt={username} />
                <AvatarFallback className="text-lg">
                  {username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="font-medium">Profile Picture</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Upload New
                  </Button>
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formValues.username}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    name="bio"
                    value={formValues.bio}
                    onChange={handleInputChange}
                    placeholder="Tell others about yourself"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="Your email address"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your email will not be displayed publicly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Control which notifications you receive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Review Comments</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone replies to your review
                </p>
              </div>
              <Switch
                checked={settings.notificationPreferences.reviewComments}
                onCheckedChange={(checked) =>
                  handleToggleChange(
                    "reviewComments",
                    "notificationPreferences",
                    checked
                  )
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Product Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified about updates to products you've saved
                </p>
              </div>
              <Switch
                checked={settings.notificationPreferences.productUpdates}
                onCheckedChange={(checked) =>
                  handleToggleChange(
                    "productUpdates",
                    "notificationPreferences",
                    checked
                  )
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">New Features</h4>
                <p className="text-sm text-muted-foreground">
                  Learn about new features and improvements
                </p>
              </div>
              <Switch
                checked={settings.notificationPreferences.newFeatures}
                onCheckedChange={(checked) =>
                  handleToggleChange(
                    "newFeatures",
                    "notificationPreferences",
                    checked
                  )
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Control who can see your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Public Profile</h4>
                <p className="text-sm text-muted-foreground">
                  Allow others to view your profile
                </p>
              </div>
              <Switch
                checked={settings.privacySettings.publicProfile}
                onCheckedChange={(checked) =>
                  handleToggleChange(
                    "publicProfile",
                    "privacySettings",
                    checked
                  )
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Show Saved Products</h4>
                <p className="text-sm text-muted-foreground">
                  Allow others to see products you've saved
                </p>
              </div>
              <Switch
                checked={settings.privacySettings.showSavedProducts}
                onCheckedChange={(checked) =>
                  handleToggleChange(
                    "showSavedProducts",
                    "privacySettings",
                    checked
                  )
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Show Reviews</h4>
                <p className="text-sm text-muted-foreground">
                  Allow others to see reviews you've written
                </p>
              </div>
              <Switch
                checked={settings.privacySettings.showReviews}
                onCheckedChange={(checked) =>
                  handleToggleChange("showReviews", "privacySettings", checked)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Manage your connected email and wallet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-sm text-muted-foreground">
                  {settings.connectedAccounts.email || "No email connected"}
                </p>
              </div>
              <Button variant="outline" size="sm">
                {settings.connectedAccounts.email ? "Change" : "Connect"}
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Wallet</h4>
                <p className="text-sm text-muted-foreground">
                  {settings.connectedAccounts.walletAddress ||
                    "No wallet connected"}
                </p>
              </div>
              <Button variant="outline" size="sm">
                {settings.connectedAccounts.walletAddress ? "Change" : "Connect"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
