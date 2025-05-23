import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CuratedListHero } from "@/components/curated-list/CuratedListHero";
import { CuratedListAdminControls } from "@/components/curated-list/CuratedListAdminControls";
import { CuratedListProductGrid } from "@/components/curated-list/CuratedListProductGrid";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar, Pin, Edit, MoveVertical, Plus, Trash2 } from "lucide-react";
import { CuratedList, Product } from "@/types/product";

// Mock data for development purposes
const mockLists: Record<string, CuratedList> = {
  "best-wallet-tools": {
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
  "dao-essentials": {
    id: "dao-essentials",
    title: "DAO Essential Stack",
    description: "The fundamental tools every new DAO needs for governance, treasury management, and coordination.",
    createdAt: "2025-03-22T14:20:00Z",
    updatedAt: "2025-05-05T09:15:00Z",
    createdBy: "Jamie Smith",
    isPinned: false,
    tags: ["DAOs", "Governance", "Treasury"],
    productIds: ["snapshot", "coordinape", "llama"]
  }
};

const mockProducts: Record<string, Product> = {
  "web3auth": {
    id: "web3auth",
    name: "Web3Auth",
    category: "Authentication",
    signalScore: 8.4,
    logo: "📱",
    price: "Freemium",
    badges: ["Social Login", "Multi-Chain", "SDK"],
    description: "Secure authentication for Web3 applications with social login support."
  },
  "metamask": {
    id: "metamask",
    name: "MetaMask",
    category: "Wallet",
    signalScore: 9.1,
    logo: "🦊",
    price: "Free",
    badges: ["Browser Extension", "Mobile", "Popular"],
    description: "The leading browser extension wallet for Ethereum and EVM compatible chains."
  },
  "rainbow": {
    id: "rainbow",
    name: "Rainbow",
    category: "Wallet",
    signalScore: 8.7,
    logo: "🌈",
    price: "Free",
    badges: ["Mobile", "NFT", "Multi-Chain"],
    description: "A fun, simple, and secure way to manage your Ethereum assets."
  },
  "snapshot": {
    id: "snapshot",
    name: "Snapshot",
    category: "Governance",
    signalScore: 8.9,
    logo: "📸",
    price: "Free",
    badges: ["Voting", "Off-chain", "Multi-sig"],
    description: "A decentralized voting system for DAOs and blockchain governance."
  },
  "coordinape": {
    id: "coordinape",
    name: "Coordinape",
    category: "Contributor Management",
    signalScore: 7.8,
    logo: "🦍",
    price: "Freemium",
    badges: ["Compensation", "DAO", "Contributors"],
    description: "Circle-based compensation tooling for DAOs, allowing for peer allocation of rewards."
  },
  "llama": {
    id: "llama",
    name: "Llama",
    category: "Treasury Management",
    signalScore: 8.2,
    logo: "🦙",
    price: "Freemium",
    badges: ["Treasury", "Multisig", "Payroll"],
    description: "Treasury management, budgeting, and payments for DAOs and protocols."
  }
};

export default function CuratedListDetail() {
  const { listId } = useParams<{ listId: string }>();
  const [list, setList] = useState<CuratedList | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(true); // This would normally be determined by auth/role
  
  useEffect(() => {
    if (listId) {
      // In a real app, we would fetch from Supabase here
      const curatedList = mockLists[listId];
      
      if (curatedList) {
        setList(curatedList);
        
        // Get products in the list
        const listProducts = curatedList.productIds.map(id => mockProducts[id]).filter(Boolean);
        setProducts(listProducts);
      }
    }
  }, [listId]);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  if (!list) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">List not found</h2>
            <p className="mt-2 text-muted-foreground">The requested curated list could not be found.</p>
            <Button className="mt-4" asChild>
              <Link to="/curated-lists">Back to Lists</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero section */}
        <CuratedListHero list={list} formatDate={formatDate} />
        
        <div className="container mx-auto px-4 py-8">
          {/* Description */}
          <div className="mb-8">
            <p className="text-lg md:text-xl">{list.description}</p>
            <div className="flex items-center mt-4 text-sm text-muted-foreground">
              <span>Curated by {list.createdBy}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {list.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
          
          {/* Admin Controls */}
          <CuratedListAdminControls list={list} isAdmin={isAdmin} />
          
          {/* Products Section */}
          <CuratedListProductGrid products={products} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
