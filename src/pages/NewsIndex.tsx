
import { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NewsCard } from "@/components/news/NewsCard";
import { NewsItem, NewsTag, NEWS_TAGS } from "@/types/news";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function NewsIndex() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [activeTag, setActiveTag] = useState<NewsTag | "all">("all");
  const [activeSort, setActiveSort] = useState<"recent" | "popular">("recent");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  
  // Mock data fetch - in a real app, this would be an API call
  const fetchArticles = useCallback(async (pageNum: number, tag: NewsTag | "all", sort: "recent" | "popular") => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock news data
    const mockArticles: NewsItem[] = [
      {
        id: "1",
        title: "DeFi Protocol Security Audit Results",
        slug: "defi-protocol-security-audit-results",
        summary: "Major findings from the latest security audits across leading DeFi protocols reveal important insights for developers and users.",
        content: "Full content would go here...",
        tag: "security",
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
        readTime: "8 min",
        publishedAt: "2025-05-19"
      },
    ];
    
    // Filter by tag if needed
    const filteredArticles = tag === "all" 
      ? mockArticles 
      : mockArticles.filter(article => article.tag === tag);
    
    // Sort articles
    const sortedArticles = [...filteredArticles].sort((a, b) => {
      if (sort === "recent") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      // For "popular" sort, we'd use a popularity metric in a real app
      // Here we're just using read time as a stand-in
      return parseInt(b.readTime) - parseInt(a.readTime);
    });
    
    // Paginate the results
    const paginatedArticles = sortedArticles.slice(0, pageNum * 6);
    
    // Check if there are more articles to load
    const moreAvailable = paginatedArticles.length < sortedArticles.length;
    
    setArticles(paginatedArticles);
    setHasMore(moreAvailable);
    setIsLoading(false);
  }, []);
  
  useEffect(() => {
    // Reset page when filters change
    setPage(1);
    fetchArticles(1, activeTag, activeSort);
  }, [activeTag, activeSort, fetchArticles]);
  
  // Set up intersection observer for infinite scroll
  const lastArticleRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          fetchArticles(nextPage, activeTag, activeSort);
          return nextPage;
        });
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore, activeTag, activeSort, fetchArticles]);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Web3 News & Insights</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay informed with the latest developments, trends, and analyses in the Web3 ecosystem.
            </p>
          </div>
          
          <div className="mb-8">
            <Tabs value={activeSort} onValueChange={(value) => setActiveSort(value as "recent" | "popular")}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <TabsList>
                  <TabsTrigger value="recent">Most Recent</TabsTrigger>
                  <TabsTrigger value="popular">Most Read</TabsTrigger>
                </TabsList>
                
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={activeTag === "all" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setActiveTag("all")}
                  >
                    All
                  </Badge>
                  {NEWS_TAGS.map(tag => (
                    <Badge
                      key={tag.value}
                      variant={activeTag === tag.value ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer",
                        activeTag === tag.value && `bg-${tag.color}-600 hover:bg-${tag.color}-700`
                      )}
                      onClick={() => setActiveTag(tag.value)}
                    >
                      {tag.label}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <TabsContent value={activeSort} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articles.map((article, index) => {
                    if (articles.length === index + 1) {
                      return (
                        <div ref={lastArticleRef} key={article.id}>
                          <NewsCard article={article} />
                        </div>
                      );
                    } else {
                      return <NewsCard key={article.id} article={article} />;
                    }
                  })}
                </div>
                
                {isLoading && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Loading more articles...</p>
                  </div>
                )}
                
                {!hasMore && articles.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You've reached the end of the articles</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
