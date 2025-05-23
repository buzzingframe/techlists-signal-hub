
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid grid-cols-6 w-full">
        <TabsTrigger value="dashboard">Overview</TabsTrigger>
        <TabsTrigger value="submissions">Submissions</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="lists">Curated Lists</TabsTrigger>
        <TabsTrigger value="news">News</TabsTrigger>
        <TabsTrigger value="tags">Tags</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
