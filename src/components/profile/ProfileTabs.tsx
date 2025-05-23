
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bookmark, Star, Upload, Layers, Settings } from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  stats: {
    savedProducts: number;
    reviewsWritten: number;
    stacksCreated: number;
  };
}

export function ProfileTabs({ activeTab, onTabChange, stats }: ProfileTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-8">
      <TabsList className="grid grid-cols-5 w-full">
        <TabsTrigger value="saved" className="flex items-center gap-1.5">
          <Bookmark className="w-4 h-4" />
          <span className="hidden sm:inline">Saved Products</span>
          <span className="sm:hidden">Saved</span>
          <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">
            {stats.savedProducts}
          </span>
        </TabsTrigger>
        
        <TabsTrigger value="reviews" className="flex items-center gap-1.5">
          <Star className="w-4 h-4" />
          <span className="hidden sm:inline">My Reviews</span>
          <span className="sm:hidden">Reviews</span>
          <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">
            {stats.reviewsWritten}
          </span>
        </TabsTrigger>
        
        <TabsTrigger value="submissions" className="flex items-center gap-1.5">
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Submissions</span>
          <span className="sm:hidden">Submit</span>
        </TabsTrigger>
        
        <TabsTrigger value="stacks" className="flex items-center gap-1.5">
          <Layers className="w-4 h-4" />
          <span className="hidden sm:inline">My Stacks</span>
          <span className="sm:hidden">Stacks</span>
          <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">
            {stats.stacksCreated}
          </span>
        </TabsTrigger>
        
        <TabsTrigger value="settings" className="flex items-center gap-1.5">
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings</span>
          <span className="sm:hidden">Settings</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
