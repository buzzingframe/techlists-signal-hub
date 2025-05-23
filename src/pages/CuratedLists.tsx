
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Pin, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { CuratedList } from "@/types/product";

// Mock data for development purposes
const mockLists: CuratedList[] = [
  {
    id: "best-wallet-tools",
    title: "Best Wallet Tools for 2025",
    description: "Our top picks for managing your crypto across chains with maximum security and convenience.",
    createdAt: "2025-04-12T10:30:00Z",
    updatedAt: "2025-05-10T15:45:00Z",
    createdBy: "Alex Chen",
    isPinned: true,
    coverImage: "https://via.placeholder.com/800x400",
    tags: ["Wallets", "Security", "Multi-chain"],
    productIds: ["web3auth", "metamask", "rainbow"]
  },
  {
    id: "dao-essentials",
    title: "DAO Essential Stack",
    description: "The fundamental tools every new DAO needs for governance, treasury management, and coordination.",
    createdAt: "2025-03-22T14:20:00Z",
    updatedAt: "2025-05-05T09:15:00Z",
    createdBy: "Jamie Smith",
    isPinned: false,
    tags: ["DAOs", "Governance", "Treasury"],
    productIds: ["snapshot", "coordinape", "llama"]
  },
  {
    id: "nft-creator-toolkit",
    title: "NFT Creator Toolkit",
    description: "Everything you need to design, mint, and distribute your NFT collection.",
    createdAt: "2025-02-18T11:10:00Z",
    updatedAt: "2025-04-30T16:40:00Z",
    createdBy: "Sarah Wang",
    isPinned: true,
    coverImage: "https://via.placeholder.com/800x400",
    tags: ["NFTs", "Creation", "Distribution"],
    productIds: ["manifold", "opensea", "zora"]
  }
];

export default function CuratedLists() {
  const [lists, setLists] = useState<CuratedList[]>([]);
  const [isAdmin, setIsAdmin] = useState(true); // This would normally be determined by auth/role check
  
  useEffect(() => {
    // In a real app, we would fetch from Supabase here
    setLists(mockLists);
  }, []);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Curated Lists</h1>
              <p className="text-muted-foreground">
                Discover handpicked collections of the best tools for specific use cases
              </p>
            </div>
            
            {isAdmin && (
              <Button as={Link} to="/curated-lists/create">
                Create New List
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((list) => (
              <Card key={list.id} className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                {list.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <img 
                      src={list.coverImage} 
                      alt={list.title} 
                      className="h-full w-full object-cover"
                    />
                    {list.isPinned && (
                      <div className="absolute top-3 right-3 bg-black/70 rounded-full p-1">
                        <Pin className="h-4 w-4 text-yellow-400" />
                      </div>
                    )}
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{list.title}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>Updated {formatDate(list.updatedAt)}</span>
                      </div>
                    </div>
                    
                    {!list.coverImage && list.isPinned && (
                      <Pin className="h-4 w-4 text-yellow-400" />
                    )}
                  </div>
                  <CardDescription className="mt-2">{list.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {list.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between pt-2">
                  <div className="text-sm text-muted-foreground">
                    {list.productIds.length} products
                  </div>
                  
                  <Button variant="outline" asChild>
                    <Link to={`/curated-lists/${list.id}`}>View List</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
