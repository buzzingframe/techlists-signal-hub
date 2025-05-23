
import { useState } from "react";
import { UserProfile } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProfileHeaderProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
}

export function ProfileHeader({ userProfile, onUpdateProfile }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState(userProfile.bio || "");
  
  const handleSaveBio = () => {
    onUpdateProfile({ bio: editedBio });
    setIsEditing(false);
  };
  
  const joinedDate = new Date(userProfile.joinedAt);

  return (
    <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        {/* Avatar */}
        <div className="relative group">
          <Avatar className="h-24 w-24 border-4 border-background shadow-md">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.username} />
            <AvatarFallback className="text-xl font-bold bg-blue-100 text-blue-600">
              {userProfile.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button 
            variant="secondary" 
            size="sm"
            className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold mb-1">{userProfile.username}</h1>
          
          <div className="flex items-center justify-center sm:justify-start text-sm text-muted-foreground gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Joined {formatDistanceToNow(joinedDate, { addSuffix: true })}</span>
            </div>
            {userProfile.isContributor && (
              <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-0.5 rounded-full text-xs font-medium">Contributor</span>
            )}
          </div>

          {/* Bio */}
          {isEditing ? (
            <div className="max-w-lg">
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className="w-full rounded-md border p-2 text-sm focus:ring-blue-500 focus:border-blue-500 mb-2 min-h-[80px]"
                placeholder="Tell us about yourself..."
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button size="sm" onClick={handleSaveBio}>Save</Button>
              </div>
            </div>
          ) : (
            <div className="relative group max-w-lg">
              <p className="text-sm text-muted-foreground mb-2">{userProfile.bio || "No bio added yet..."}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-3.5 w-3.5 mr-1" />
                Edit
              </Button>
            </div>
          )}
        </div>
        
        {/* Stats */}
        <div className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
          <div className="text-center">
            <p className="text-2xl font-bold">{userProfile.stats.savedProducts}</p>
            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{userProfile.stats.reviewsWritten}</p>
            <p className="text-xs text-muted-foreground">Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{userProfile.stats.stacksCreated}</p>
            <p className="text-xs text-muted-foreground">Stacks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
