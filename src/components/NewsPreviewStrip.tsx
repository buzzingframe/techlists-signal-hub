
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  tag: string;
  readTime: string;
}

export function NewsPreviewStrip() {
  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "DeFi Protocol Security Audit Results",
      summary: "Major findings from the latest security audits across leading DeFi protocols...",
      tag: "Security",
      readTime: "3 min"
    },
    {
      id: "2", 
      title: "New Layer 2 Scaling Solutions Comparison",
      summary: "Comprehensive analysis of the latest L2 solutions and their performance metrics...",
      tag: "Infrastructure",
      readTime: "5 min"
    },
    {
      id: "3",
      title: "NFT Marketplace Gas Optimization",
      summary: "How leading marketplaces are reducing transaction costs for users...",
      tag: "NFTs",
      readTime: "4 min"
    }
  ];

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Latest Insights</h2>
            <p className="text-muted-foreground">Stay updated with Web3 developments</p>
          </div>
          <Button variant="outline">See All News</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group bg-card rounded-lg border p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="text-xs">
                  {item.tag}
                </Badge>
                <span className="text-xs text-muted-foreground">{item.readTime}</span>
              </div>
              
              <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {item.summary}
              </p>
              
              <Button variant="ghost" size="sm" className="p-0 h-auto font-medium text-blue-600 hover:text-blue-700">
                Read more →
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
