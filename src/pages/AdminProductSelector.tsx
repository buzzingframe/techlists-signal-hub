
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SignalScoreBadge } from "@/components/SignalScoreBadge";
import { Search } from "lucide-react";
import { Product } from "@/types/product";

// Mock data for development purposes
const mockProducts: Product[] = [
  {
    id: "web3auth",
    name: "Web3Auth",
    category: "Authentication",
    signalScore: 8.4,
    logo: "📱",
    price: "Freemium",
    badges: ["Social Login", "Multi-Chain", "SDK"],
    description: "Secure authentication for Web3 applications with social login support."
  },
  {
    id: "metamask",
    name: "MetaMask",
    category: "Wallet",
    signalScore: 9.1,
    logo: "🦊",
    price: "Free",
    badges: ["Browser Extension", "Mobile", "Popular"],
    description: "The leading browser extension wallet for Ethereum and EVM compatible chains."
  },
  {
    id: "rainbow",
    name: "Rainbow",
    category: "Wallet",
    signalScore: 8.7,
    logo: "🌈",
    price: "Free",
    badges: ["Mobile", "NFT", "Multi-Chain"],
    description: "A fun, simple, and secure way to manage your Ethereum assets."
  },
  {
    id: "snapshot",
    name: "Snapshot",
    category: "Governance",
    signalScore: 8.9,
    logo: "📸",
    price: "Free",
    badges: ["Voting", "Off-chain", "Multi-sig"],
    description: "A decentralized voting system for DAOs and blockchain governance."
  },
  {
    id: "coordinape",
    name: "Coordinape",
    category: "Contributor Management",
    signalScore: 7.8,
    logo: "🦍",
    price: "Freemium",
    badges: ["Compensation", "DAO", "Contributors"],
    description: "Circle-based compensation tooling for DAOs, allowing for peer allocation of rewards."
  }
];

export default function AdminProductSelector() {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch from Supabase here
    setProducts(mockProducts);
    
    // If we're editing an existing list, we would load its products
    if (listId) {
      // Mock loading selected products for demo
      setSelectedProducts(["web3auth", "snapshot"]);
    }
  }, [listId]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Here we would normally save to Supabase
    // In this mock version, we just wait and redirect
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Selected products:", selectedProducts);
      
      // Redirect to the list detail page
      navigate(listId ? `/curated-lists/${listId}` : "/curated-lists");
    } catch (error) {
      console.error("Error saving products:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
              {listId ? "Edit Products in List" : "Add Products to New List"}
            </h1>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Select Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products by name, category, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="hidden md:table-cell">Price</TableHead>
                        <TableHead className="hidden md:table-cell">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() => handleToggleProduct(product.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center text-lg">
                                {product.logo}
                              </div>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                                  {product.description}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.category}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.price}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <SignalScoreBadge score={product.signalScore} size="sm" />
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredProducts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No products found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {selectedProducts.length} products selected
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/curated-lists")}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
