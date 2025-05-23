
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsItem, NEWS_TAGS } from "@/types/news";
import { Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface NewsCardProps {
  article: NewsItem;
  variant?: "default" | "compact";
}

export function NewsCard({ article, variant = "default" }: NewsCardProps) {
  const navigate = useNavigate();
  const tagInfo = NEWS_TAGS.find(tag => tag.value === article.tag) || NEWS_TAGS[0];
  
  const handleClick = () => {
    navigate(`/news/${article.slug}`);
  };
  
  if (variant === "compact") {
    return (
      <Card 
        className="group hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer"
        onClick={handleClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-1">
            <Badge variant="secondary" className="text-xs">
              {tagInfo.label}
            </Badge>
            <span className="text-xs text-muted-foreground">{article.readTime}</span>
          </div>
          <h3 className="font-semibold group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
            {article.title}
          </h3>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className="group hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge 
            variant="secondary" 
            className={`text-xs bg-${tagInfo.color}-100 text-${tagInfo.color}-800 dark:bg-${tagInfo.color}-900/20 dark:text-${tagInfo.color}-400`}
          >
            <Tag className="w-3 h-3 mr-1" />
            {tagInfo.label}
          </Badge>
          <span className="text-xs text-muted-foreground">{article.readTime}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {article.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {format(new Date(article.publishedAt), "MMM d, yyyy")}
            {article.author && ` · ${article.author}`}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700"
          >
            Read more →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
