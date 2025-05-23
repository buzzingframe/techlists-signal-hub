
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { NewsItem, NEWS_TAGS } from "@/types/news";
import { Plus, Search, Edit, Trash, Eye } from "lucide-react";

export default function AdminNews() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data fetch - in a real app, this would be an API call
  useEffect(() => {
    const fetchArticles = async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Mock articles data
      const mockArticles: NewsItem[] = [
        {
          id: "1",
          title: "DeFi Protocol Security Audit Results",
          slug: "defi-protocol-security-audit-results",
          summary: "Major findings from the latest security audits across leading DeFi protocols reveal important insights for developers and users.",
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
          summary: "Comprehensive analysis of the latest L2 solutions and their performance metrics shows dramatic improvements in throughput.",
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
          summary: "How leading marketplaces are reducing transaction costs for users through innovative batching techniques and L2 integration.",
          content: "Full content would go here...",
          tag: "nfts",
          author: "Jason Kim",
          readTime: "4 min",
          publishedAt: "2025-05-22"
        },
        {
          id: "4",
          title: "Weekly Web3 Ecosystem Recap",
          slug: "weekly-web3-ecosystem-recap",
          summary: "This week's most important developments across the web3 landscape, from protocol upgrades to new product launches.",
          content: "Full content would go here...",
          tag: "weekly-recap",
          author: "Sarah Johnson",
          readTime: "7 min",
          publishedAt: "2025-05-23"
        },
        {
          id: "5",
          title: "The Future of DAOs in Corporate Governance",
          slug: "future-daos-corporate-governance",
          summary: "An exploration of how decentralized autonomous organizations could transform traditional business structures.",
          content: "Full content would go here...",
          tag: "opinion",
          author: "Michael Torres",
          readTime: "6 min",
          publishedAt: "2025-05-21"
        },
        {
          id: "6",
          title: "Guide: Setting Up Your First Web3 Wallet",
          slug: "guide-setting-up-web3-wallet",
          summary: "A step-by-step tutorial for beginners on how to create and secure their first cryptocurrency wallet.",
          content: "Full content would go here...",
          tag: "guide",
          author: "Jamie Rodriguez",
          readTime: "8 min",
          publishedAt: "2025-05-19"
        },
      ];
      
      setArticles(mockArticles);
      setIsLoading(false);
    };
    
    fetchArticles();
  }, []);
  
  // Filter articles based on search query
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.author && article.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleDeleteArticle = async (id: string) => {
    // In a real app, this would delete from the database
    // For demo purposes, we'll just remove from the local state
    
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      setArticles(articles.filter(article => article.id !== id));
      
      toast({
        title: "Article deleted",
        description: "The article has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting article:", error);
      toast({
        title: "Failed to delete article",
        description: "An error occurred while deleting the article.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-muted/50 py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">News Management</h1>
              <p className="text-muted-foreground">Manage articles and news content</p>
            </div>
            <div>
              <Button onClick={() => navigate("/admin/news/new")}>
                <Plus className="mr-2 h-4 w-4" />
                Create New Article
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles by title, content, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-center py-8 text-muted-foreground">Loading articles...</p>
          ) : filteredArticles.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No articles found</p>
          ) : (
            filteredArticles.map(article => {
              const tagInfo = NEWS_TAGS.find(tag => tag.value === article.tag) || NEWS_TAGS[0];
              
              return (
                <Card key={article.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-1 p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">
                            {tagInfo.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                        
                        <p className="text-muted-foreground line-clamp-2 mb-3">
                          {article.summary}
                        </p>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          {article.author && (
                            <span className="mr-3">By: {article.author}</span>
                          )}
                          <span>{article.readTime} read</span>
                        </div>
                      </div>
                      
                      <div className="flex md:flex-col justify-end border-t md:border-t-0 md:border-l bg-muted/20">
                        <Button
                          variant="ghost"
                          className="flex-1 rounded-none border-r md:border-r-0 md:border-b"
                          onClick={() => navigate(`/news/${article.slug}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          className="flex-1 rounded-none border-r md:border-r-0 md:border-b"
                          onClick={() => navigate(`/admin/news/${article.id}/edit`)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          className="flex-1 rounded-none text-destructive hover:text-destructive"
                          onClick={() => handleDeleteArticle(article.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
