
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { NewsItem, NEWS_TAGS } from "@/types/news";
import { Tag } from "lucide-react";

export function NewsPreviewStrip() {
  const navigate = useNavigate();
  
  // Mock news data (this would come from an API/database in a real app)
  const newsItems: NewsItem[] = [
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
    }
  ];

  const handleNavigateToNews = () => {
    navigate("/news");
  };

  const handleNavigateToArticle = (slug: string) => {
    navigate(`/news/${slug}`);
  };

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Latest Insights</h2>
            <p className="text-muted-foreground">Stay updated with Web3 developments</p>
          </div>
          <Button variant="outline" onClick={handleNavigateToNews}>See All News</Button>
        </div>

        <ScrollArea className="w-full">
          <div className="flex gap-6 pb-4">
            {newsItems.map((item) => {
              const tagInfo = NEWS_TAGS.find(tag => tag.value === item.tag) || NEWS_TAGS[0];
              
              return (
                <Card 
                  key={item.id}
                  className="group min-w-[300px] max-w-[300px] hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleNavigateToArticle(item.slug)}
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
                      <span className="text-xs text-muted-foreground">{item.readTime}</span>
                    </div>
                    
                    <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {item.summary}
                    </p>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700"
                    >
                      Read more →
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
