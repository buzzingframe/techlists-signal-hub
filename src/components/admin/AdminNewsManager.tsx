
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { NewsItem, NEWS_TAGS } from "@/types/news";
import { Plus } from "lucide-react";

export function AdminNewsManager() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recentArticles, setRecentArticles] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data fetch - in a real app, this would be an API call
  useEffect(() => {
    const fetchRecentArticles = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Mock articles data
      const mockArticles: NewsItem[] = [
        {
          id: "1",
          title: "DeFi Protocol Security Audit Results",
          slug: "defi-protocol-security-audit-results",
          summary: "Major findings from the latest security audits across leading DeFi protocols...",
          content: "Full content would go here...",
          tag: "security",
          author: "Alex Rivers",
          readTime: "3 min",
          publishedAt: "2025-05-18"
        },
        {
          id: "2", 
          title: "New Layer 2 Scaling Solutions Comparison",
          slug: "layer-2-scaling-solutions-comparison",
          summary: "Comprehensive analysis of the latest L2 solutions and their performance metrics...",
          content: "Full content would go here...",
          tag: "infrastructure",
          author: "Emma Chen",
          readTime: "5 min",
          publishedAt: "2025-05-20"
        },
        {
          id: "3",
          title: "NFT Marketplace Gas Optimization",
          slug: "nft-marketplace-gas-optimization",
          summary: "How leading marketplaces are reducing transaction costs for users...",
          content: "Full content would go here...",
          tag: "nfts",
          author: "Jason Kim",
          readTime: "4 min",
          publishedAt: "2025-05-22"
        },
      ];
      
      setRecentArticles(mockArticles.slice(0, 3));
      setIsLoading(false);
    };
    
    fetchRecentArticles();
  }, []);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">News Management</h2>
        <Button onClick={() => navigate("/admin/news/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Article
        </Button>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Articles</h3>
        
        {isLoading ? (
          <p className="text-muted-foreground">Loading recent articles...</p>
        ) : (
          <div className="grid gap-4">
            {recentArticles.map(article => {
              const tagInfo = NEWS_TAGS.find(tag => tag.value === article.tag) || NEWS_TAGS[0];
              
              return (
                <Card key={article.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{tagInfo.label}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h3 className="font-medium">{article.title}</h3>
                        
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {article.summary}
                        </p>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="shrink-0"
                        onClick={() => navigate(`/admin/news/${article.id}/edit`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        
        <div className="flex justify-center mt-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/news")}
          >
            Manage All Articles
          </Button>
        </div>
      </div>
    </div>
  );
}
