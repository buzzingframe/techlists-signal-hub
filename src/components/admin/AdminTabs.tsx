
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCheck, MessageSquare, List, Tag, LineChart } from "lucide-react";

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <LineChart className="w-4 h-4" />
          <span className="hidden md:inline">Dashboard</span>
        </TabsTrigger>
        <TabsTrigger value="submissions" className="flex items-center gap-2">
          <ClipboardCheck className="w-4 h-4" />
          <span className="hidden md:inline">Submissions</span>
        </TabsTrigger>
        <TabsTrigger value="reviews" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          <span className="hidden md:inline">Reviews</span>
        </TabsTrigger>
        <TabsTrigger value="lists" className="flex items-center gap-2">
          <List className="w-4 h-4" />
          <span className="hidden md:inline">Lists</span>
        </TabsTrigger>
        <TabsTrigger value="tags" className="flex items-center gap-2">
          <Tag className="w-4 h-4" />
          <span className="hidden md:inline">Categories & Tags</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
