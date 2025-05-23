
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NewsCard } from "@/components/news/NewsCard";
import { NewsItem, NEWS_TAGS } from "@/types/news";
import { format } from "date-fns";
import { Tag, ChevronLeft, ArrowUp } from "lucide-react";

export default function NewsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);
  const [nextArticle, setNextArticle] = useState<NewsItem | null>(null);
  const [showNextArticlePrompt, setShowNextArticlePrompt] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Mock data - in a real app, these would be API calls
  useEffect(() => {
    // Simulate API delay
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Mock articles data
      const mockArticles: NewsItem[] = [
        {
          id: "1",
          title: "DeFi Protocol Security Audit Results",
          slug: "defi-protocol-security-audit-results",
          summary: "Major findings from the latest security audits across leading DeFi protocols reveal important insights for developers and users.",
          content: `<p class="lead">Security researchers have identified several patterns of vulnerabilities across popular DeFi protocols in the latest round of comprehensive audits.</p>
          <p>The findings, published yesterday by blockchain security firm ChainShield, highlight recurring issues in smart contract implementations that could potentially lead to fund loss or protocol manipulation.</p>
          <h2>Key Findings</h2>
          <ul>
            <li>Reentrancy vulnerabilities remain common despite being well-documented</li>
            <li>Access control issues were found in 42% of audited protocols</li>
            <li>Flash loan attack vectors were identified in 28% of lending protocols</li>
          </ul>
          <p>"Many of these issues stem from developers rushing to market without sufficient testing," explained ChainShield's lead researcher Maria Lopez. "The pressure to launch quickly often comes at the expense of security best practices."</p>
          <h2>Positive Developments</h2>
          <p>Despite these concerns, the report also highlighted positive trends in the ecosystem. More projects are implementing:</p>
          <ul>
            <li>Formal verification techniques</li>
            <li>Progressive decentralization of admin controls</li>
            <li>Comprehensive bug bounty programs</li>
          </ul>
          <p>These measures have contributed to a 35% reduction in critical vulnerabilities compared to last year's audit results.</p>
          <h2>Recommendations</h2>
          <p>The report recommends that DeFi users:</p>
          <ol>
            <li>Check if protocols have undergone multiple independent audits</li>
            <li>Verify if audit findings were addressed before deployment</li>
            <li>Start with smaller amounts when using new protocols</li>
            <li>Look for insurance options to cover potential exploits</li>
          </ol>
          <p>As the DeFi space continues to mature, security standards are gradually improving, but users should remain vigilant and prioritize projects with strong security practices.</p>`,
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
          content: `<p class="lead">A new wave of Layer 2 scaling solutions is dramatically improving Ethereum's transaction throughput while maintaining security guarantees.</p>
          <p>Our analysis compares the latest implementations across key metrics including transactions per second (TPS), gas costs, and settlement assurances.</p>
          <h2>Optimistic Rollups vs. ZK Rollups</h2>
          <p>The two main approaches to Layer 2 scaling continue to be Optimistic and Zero-Knowledge rollups, each with distinct advantages:</p>
          <h3>Optimistic Rollups</h3>
          <ul>
            <li>Higher compatibility with existing Ethereum smart contracts</li>
            <li>Lower computational requirements</li>
            <li>Challenge period introduces withdrawal delays (typically 7 days)</li>
          </ul>
          <h3>ZK Rollups</h3>
          <ul>
            <li>Faster finality with cryptographic proofs</li>
            <li>No challenge period required for withdrawals</li>
            <li>Higher computational complexity</li>
          </ul>
          <p>Recent benchmarks show ZK rollups achieving up to 2,000 TPS while Optimistic solutions reach approximately 1,200 TPS.</p>
          <h2>Cost Comparison</h2>
          <p>When examining transaction costs, we found:</p>
          <ol>
            <li>Simple transfers cost 10-25× less on L2s compared to Ethereum mainnet</li>
            <li>Complex smart contract interactions show 5-15× cost reduction</li>
            <li>Batch processing can further reduce costs by up to 40%</li>
          </ol>
          <p>These efficiency gains are making previously uneconomical use cases viable on Ethereum.</p>
          <h2>Looking Ahead</h2>
          <p>The competition between L2 solutions is driving rapid innovation. Several projects have announced roadmaps that include:</p>
          <ul>
            <li>Further compression techniques to reduce calldata costs</li>
            <li>Cross-L2 interoperability protocols</li>
            <li>Specialized L2s optimized for specific use cases</li>
          </ul>
          <p>As these technologies mature, we're seeing the beginnings of a modular blockchain ecosystem with Ethereum providing settlement and security while L2s handle execution at scale.</p>`,
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
          content: `<p class="lead">NFT marketplaces are implementing sophisticated gas optimization strategies to reduce costs for users and improve the overall trading experience.</p>
          <p>With gas fees continuing to be a pain point for Ethereum users, major NFT platforms are rolling out innovative solutions to minimize transaction costs.</p>
          <h2>Batched Transactions</h2>
          <p>One of the most effective approaches has been transaction batching, where multiple operations are combined into a single on-chain transaction:</p>
          <ul>
            <li>Bulk listing/delisting saves up to 70% in gas costs</li>
            <li>Multi-item purchases reduce fees by approximately 60% per item</li>
            <li>Collection offers utilize a single transaction for multiple potential purchases</li>
          </ul>
          <p>"We've completely redesigned our contract architecture to prioritize gas efficiency," said Ryan Park, CTO at OpenOcean, a leading NFT marketplace. "By optimizing our smart contracts and implementing batching, we've reduced gas consumption by over 40% compared to last year."</p>
          <h2>Layer 2 Integration</h2>
          <p>The second major trend is the migration to Layer 2 solutions:</p>
          <ul>
            <li>ZK-powered marketplaces now handle over 35% of daily NFT trading volume</li>
            <li>Average savings of 95-98% on gas fees compared to Layer 1</li>
            <li>Improved UX with near-instant transaction confirmation</li>
          </ul>
          <p>This shift has made NFT trading accessible to a wider audience and enabled new use cases like micro-NFTs that were previously unviable due to gas costs.</p>
          <h2>EIP-2981 Royalty Implementation</h2>
          <p>Marketplaces are also standardizing on EIP-2981 for royalty payments, which offers several advantages:</p>
          <ol>
            <li>On-chain royalty enforcement</li>
            <li>Gas-efficient royalty calculations</li>
            <li>Consistent royalty mechanisms across platforms</li>
          </ol>
          <p>"The standardization around EIP-2981 has been crucial for creating a more sustainable ecosystem for creators," explained Maria Gomez, NFT artist and advocate. "The gas savings from efficient implementation are passed on to both creators and collectors."</p>
          <h2>What's Next?</h2>
          <p>Looking forward, marketplaces are exploring even more advanced optimization techniques:</p>
          <ul>
            <li>Intent-based trading systems that match buyers and sellers off-chain</li>
            <li>Gasless transactions through meta-transactions and relayers</li>
            <li>Account abstraction to simplify the user experience</li>
          </ul>
          <p>These innovations promise to further reduce barriers to entry and improve the efficiency of NFT markets.</p>`,
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
          content: `<p class="lead">This week saw several significant developments across the web3 ecosystem, from major protocol upgrades to new product launches and regulatory developments.</p>
          <h2>Protocol Updates</h2>
          <p>Ethereum's Shanghai upgrade is now officially scheduled for April 12, bringing with it staking withdrawals and several EVM improvements. The upgrade has been successfully deployed on all testnets without major issues.</p>
          <p>Meanwhile, Polygon has announced "Polygon 2.0," a comprehensive roadmap that includes:</p>
          <ul>
            <li>A new unified ZK-based architecture</li>
            <li>Enhanced interoperability between Polygon chains</li>
            <li>Improved tokenomics model with fee-sharing</li>
          </ul>
          <p>Solana has also seen performance improvements with its latest validator release, achieving 95% reduction in outage incidents over the past quarter.</p>
          <h2>Product Launches</h2>
          <p>This week's notable product launches include:</p>
          <h3>MetaWallet Pro</h3>
          <p>A significant upgrade to the popular web3 wallet, now featuring:</p>
          <ul>
            <li>Multi-chain portfolio tracking</li>
            <li>Hardware wallet integration</li>
            <li>Advanced transaction simulation</li>
          </ul>
          <h3>DeFiGuard</h3>
          <p>A new DeFi security tool that provides:</p>
          <ul>
            <li>Real-time threat detection</li>
            <li>Contract auditing integration</li>
            <li>Phishing protection</li>
          </ul>
          <h3>NFT Marketplace Consolidation</h3>
          <p>Blur has acquired Gem, consolidating their position in the NFT aggregator space. This move is expected to give Blur over 60% market share in the NFT trading volume.</p>
          <h2>Funding & Business</h2>
          <p>Notable funding rounds this week:</p>
          <ul>
            <li>ZKSync developer Matter Labs raised $200M in Series C funding</li>
            <li>Web3 gaming studio Emergent raised $12M for their flagship title</li>
            <li>DeFi protocol Aero Finance secured $50M in hybrid funding</li>
          </ul>
          <h2>Regulatory Developments</h2>
          <p>On the regulatory front:</p>
          <ul>
            <li>The EU Parliament voted to advance the MiCA regulations to the next stage</li>
            <li>Singapore introduced new guidelines for crypto marketing</li>
            <li>Brazil's central bank published its CBDC implementation timeline</li>
          </ul>
          <p>Next week promises to be equally eventful with several major conferences and expected announcements from key projects. Stay tuned for our continuing coverage.</p>`,
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
          content: `<p class="lead">Decentralized Autonomous Organizations (DAOs) are beginning to challenge traditional corporate governance models, offering new paradigms for collective decision-making and ownership.</p>
          <h2>The Evolution of Corporate Structure</h2>
          <p>Traditional corporate structures have remained largely unchanged for decades, with hierarchical management, centralized decision-making, and shareholder-centric governance. DAOs represent a fundamental rethinking of these principles.</p>
          <p>Key differences between traditional corporations and DAOs include:</p>
          <ul>
            <li>Decision-making power distributed among token holders rather than concentrated in boards and executives</li>
            <li>Transparent operations executed through smart contracts rather than behind closed doors</li>
            <li>Fluid participation allowing contributors to scale involvement based on interest and expertise</li>
          </ul>
          <h2>Emerging DAO Governance Models</h2>
          <p>As the DAO ecosystem matures, several governance models are emerging:</p>
          <h3>Token-Based Voting</h3>
          <p>The most common approach uses governance tokens for proposal voting, with each token representing one vote. While straightforward, this model has faced criticism for potentially favoring wealthy participants.</p>
          <h3>Quadratic Voting</h3>
          <p>This model attempts to balance influence by making additional votes progressively more "expensive," reducing the impact of token wealth concentration.</p>
          <h3>Reputation-Based Systems</h3>
          <p>Some DAOs are implementing systems where voting power is tied to contributions and expertise rather than token holdings alone.</p>
          <h3>Delegated Voting</h3>
          <p>Similar to representative democracy, token holders can delegate their voting power to trusted experts who specialize in specific decision areas.</p>
          <h2>Hybrid Models Gaining Traction</h2>
          <p>Perhaps the most interesting development is the rise of hybrid organizations that combine elements of traditional corporate structures with DAO mechanisms:</p>
          <ul>
            <li>Legal entities that wrap DAO operations for regulatory compliance</li>
            <li>Traditional companies implementing DAO-like governance for specific decisions</li>
            <li>Project-specific DAOs spun out from centralized organizations</li>
          </ul>
          <p>"We're seeing the emergence of what might be called 'DAO-fied' corporations," explains Dr. Lisa Patel, corporate governance researcher. "These entities maintain traditional legal structures but implement decentralized decision-making for strategic initiatives, product development, or treasury management."</p>
          <h2>Challenges and Limitations</h2>
          <p>Despite the promise, significant challenges remain:</p>
          <ol>
            <li>Regulatory uncertainty across jurisdictions</li>
            <li>Governance participation rates often below 10%</li>
            <li>Coordination problems in large-scale decision-making</li>
            <li>Security vulnerabilities in smart contract implementation</li>
          </ol>
          <h2>Looking Ahead</h2>
          <p>The next five years will likely see:</p>
          <ul>
            <li>More traditional companies experimenting with DAO mechanisms</li>
            <li>Clearer regulatory frameworks specifically addressing DAO structures</li>
            <li>Improved governance tools focused on participation and efficiency</li>
            <li>Industry-specific DAO templates optimized for different business needs</li>
          </ul>
          <p>Whether DAOs will eventually replace traditional corporate structures remains to be seen, but they are already influencing how we think about coordination, ownership, and governance in the digital age.</p>`,
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
          content: `<p class="lead">A secure web3 wallet is your gateway to the decentralized web. This guide will walk you through creating and securing your first wallet.</p>
          <h2>Understanding Web3 Wallets</h2>
          <p>Before we begin setting up a wallet, it's important to understand what a web3 wallet actually is:</p>
          <ul>
            <li>A web3 wallet is software that allows you to store, send, and receive cryptocurrencies</li>
            <li>It provides access to decentralized applications (dApps)</li>
            <li>Your wallet doesn't actually store your crypto - it stores the private keys that prove ownership of your assets on the blockchain</li>
          </ul>
          <h2>Step 1: Choose a Wallet Type</h2>
          <p>There are several types of wallets to consider:</p>
          <h3>Browser Extensions</h3>
          <p>Examples: MetaMask, Brave Wallet, Coinbase Wallet</p>
          <p>Pros: Convenient for daily use, easy dApp connections</p>
          <p>Cons: Connected to the internet (hot wallet), potential browser security risks</p>
          <h3>Mobile Apps</h3>
          <p>Examples: Trust Wallet, Rainbow, Exodus</p>
          <p>Pros: Portable, convenient, often with built-in exchanges</p>
          <p>Cons: Phone loss/theft risks, malware concerns</p>
          <h3>Hardware Wallets</h3>
          <p>Examples: Ledger, Trezor, GridPlus</p>
          <p>Pros: Highest security, private keys stored offline</p>
          <p>Cons: Cost, less convenient for frequent transactions</p>
          <p>For beginners, we recommend starting with MetaMask, one of the most widely supported browser extension wallets.</p>
          <h2>Step 2: Install MetaMask</h2>
          <ol>
            <li>Visit the <a href="https://metamask.io">official MetaMask website</a></li>
            <li>Click "Download" and select your browser</li>
            <li>Follow the browser extension installation prompts</li>
            <li>Once installed, click the MetaMask icon in your browser extensions</li>
          </ol>
          <h2>Step 3: Create a New Wallet</h2>
          <ol>
            <li>Click "Create a Wallet"</li>
            <li>Set a strong password (this encrypts your wallet on your device)</li>
            <li>Write down your Secret Recovery Phrase (12-24 words) on paper - NEVER digitally</li>
            <li>Verify your Secret Recovery Phrase when prompted</li>
          </ol>
          <div class="alert alert-warning">
            <strong>CRITICAL:</strong> Your Secret Recovery Phrase is the ONLY way to recover your wallet if you lose access. Anyone who has this phrase can access your funds. Never share it, screenshot it, or store it digitally.
          </div>
          <h2>Step 4: Secure Your Wallet</h2>
          <p>Now that your wallet is set up, take these additional security steps:</p>
          <ul>
            <li>Store your recovery phrase in a secure, physical location (consider a fireproof safe)</li>
            <li>Consider making a backup copy stored in a separate location</li>
            <li>Never share your recovery phrase or private keys with anyone</li>
            <li>Be cautious of phishing sites that mimic wallet interfaces</li>
            <li>Consider enabling additional security features like hardware wallet integration</li>
          </ul>
          <h2>Step 5: Learn to Use Your Wallet</h2>
          <p>Basic operations you should familiarize yourself with:</p>
          <ul>
            <li>Checking your wallet address (for receiving funds)</li>
            <li>Sending transactions (always double-check addresses)</li>
            <li>Connecting to dApps (via the "Connect" button on websites)</li>
            <li>Adding new networks (like Polygon, Arbitrum, or Optimism)</li>
            <li>Adding custom tokens</li>
          </ul>
          <h2>Step 6: Best Practices</h2>
          <p>As you begin using your wallet, keep these best practices in mind:</p>
          <ul>
            <li>Start with small amounts until you're comfortable with the process</li>
            <li>Always verify transaction details before confirming</li>
            <li>Be cautious about which dApps you connect to</li>
            <li>Consider a separate "hot wallet" for regular transactions and a more secure wallet for long-term storage</li>
            <li>Regularly update your wallet software</li>
          </ul>
          <p>Congratulations! You now have a working web3 wallet and understand the basics of keeping it secure. As you grow more comfortable, you might want to explore hardware wallets for additional security, especially if you plan to hold significant value in cryptocurrency.</p>`,
          tag: "guide",
          author: "Jamie Rodriguez",
          readTime: "8 min",
          publishedAt: "2025-05-19"
        },
      ];
      
      // Find the current article
      const currentArticle = mockArticles.find(article => article.slug === slug) || null;
      
      if (currentArticle) {
        setArticle(currentArticle);
        
        // Find related articles (in a real app, this would use tags or categories for relevance)
        const related = mockArticles
          .filter(a => a.id !== currentArticle.id)
          .slice(0, 3);
        setRelatedArticles(related);
        
        // Set up the next article for infinite scroll
        const currentIndex = mockArticles.findIndex(a => a.id === currentArticle.id);
        const next = mockArticles[(currentIndex + 1) % mockArticles.length];
        setNextArticle(next);
      } else {
        // Article not found
        navigate("/news");
      }
    };
    
    loadData();
    
    // Reset scroll position when slug changes
    window.scrollTo(0, 0);
    setShowNextArticlePrompt(false);
    
  }, [slug, navigate]);
  
  // Set up scroll event listener for infinite scroll and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled 95% of the article
      if (contentRef.current) {
        const contentBottom = contentRef.current.getBoundingClientRect().bottom;
        const viewportHeight = window.innerHeight;
        const scrollTriggerPoint = viewportHeight * 0.05; // 5% from bottom
        
        if (contentBottom <= scrollTriggerPoint) {
          setShowNextArticlePrompt(true);
        } else {
          setShowNextArticlePrompt(false);
        }
      }
      
      // Show/hide scroll-to-top button
      if (window.scrollY > 500) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLoadNextArticle = () => {
    if (nextArticle) {
      navigate(`/news/${nextArticle.slug}`);
    }
  };
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Loading article...</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const tagInfo = NEWS_TAGS.find(tag => tag.value === article.tag) || NEWS_TAGS[0];
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-auto font-medium hover:text-foreground flex items-center gap-1"
              onClick={() => navigate("/news")}
            >
              <ChevronLeft className="w-4 h-4" />
              Back to News
            </Button>
            <span>/</span>
            <Badge variant="secondary" className="text-xs">
              {tagInfo.label}
            </Badge>
          </div>
          
          <article>
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {article.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <Badge 
                  variant="secondary" 
                  className={`text-xs bg-${tagInfo.color}-100 text-${tagInfo.color}-800 dark:bg-${tagInfo.color}-900/20 dark:text-${tagInfo.color}-400`}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tagInfo.label}
                </Badge>
                
                {article.author && (
                  <span>By {article.author}</span>
                )}
                
                <span>{format(new Date(article.publishedAt), "MMMM d, yyyy")}</span>
                
                <span>{article.readTime} read</span>
              </div>
            </header>
            
            <div 
              ref={contentRef}
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            <div className="border-t border-border pt-8 mt-12">
              <h3 className="text-xl font-semibold mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map(relatedArticle => (
                  <NewsCard 
                    key={relatedArticle.id} 
                    article={relatedArticle} 
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          </article>
        </div>
      </main>
      
      {showNextArticlePrompt && nextArticle && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg animate-in slide-in-from-bottom">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Up next</p>
                <h3 className="font-semibold">{nextArticle.title}</h3>
              </div>
              <Button onClick={handleLoadNextArticle}>
                Read Article
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {showScrollToTop && (
        <Button
          size="icon"
          className="fixed bottom-20 right-6 rounded-full shadow-lg"
          onClick={handleScrollToTop}
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      )}
      
      <Footer />
    </div>
  );
}
