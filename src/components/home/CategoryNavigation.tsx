
import { Button } from "@/components/ui/button";

interface CategoryNavigationProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isLoading?: boolean;
}

export function CategoryNavigation({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  isLoading = false 
}: CategoryNavigationProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => onCategoryChange("all")}
        disabled={isLoading}
        className="text-sm"
      >
        All Categories
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onCategoryChange(category)}
          disabled={isLoading}
          className="text-sm capitalize"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
