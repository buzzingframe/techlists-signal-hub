
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for categories and tags
const mockCategories = [
  { id: "1", name: "Wallet", slug: "wallet", count: 12 },
  { id: "2", name: "DeFi", slug: "defi", count: 24 },
  { id: "3", name: "NFT", slug: "nft", count: 18 },
  { id: "4", name: "DAO", slug: "dao", count: 9 },
  { id: "5", name: "Infrastructure", slug: "infrastructure", count: 15 },
  { id: "6", name: "Development", slug: "development", count: 21 }
];

const mockTags = [
  { id: "1", name: "Beginner-friendly", slug: "beginner-friendly", count: 28 },
  { id: "2", name: "Security", slug: "security", count: 14 },
  { id: "3", name: "Mobile", slug: "mobile", count: 32 },
  { id: "4", name: "Yield Farming", slug: "yield-farming", count: 11 },
  { id: "5", name: "Gaming", slug: "gaming", count: 8 },
  { id: "6", name: "Layer 2", slug: "layer-2", count: 15 },
  { id: "7", name: "Cross-chain", slug: "cross-chain", count: 19 },
  { id: "8", name: "DEX", slug: "dex", count: 7 },
  { id: "9", name: "Analytics", slug: "analytics", count: 13 }
];

interface TagItem {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export function AdminTags() {
  const [activeTab, setActiveTab] = useState("categories");
  const [categories, setCategories] = useState<TagItem[]>(mockCategories);
  const [tags, setTags] = useState<TagItem[]>(mockTags);
  
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  
  const [editingItem, setEditingItem] = useState<TagItem | null>(null);
  const [editName, setEditName] = useState("");
  
  const { toast } = useToast();
  
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const slug = newCategoryName.toLowerCase().replace(/\s+/g, '-');
    const newCategory: TagItem = {
      id: Date.now().toString(),
      name: newCategoryName,
      slug,
      count: 0
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    
    toast({
      title: "Category added",
      description: `"${newCategoryName}" has been added to categories`
    });
  };
  
  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    
    const slug = newTagName.toLowerCase().replace(/\s+/g, '-');
    const newTag: TagItem = {
      id: Date.now().toString(),
      name: newTagName,
      slug,
      count: 0
    };
    
    setTags([...tags, newTag]);
    setNewTagName("");
    
    toast({
      title: "Tag added",
      description: `"${newTagName}" has been added to tags`
    });
  };
  
  const handleDelete = (item: TagItem, type: "category" | "tag") => {
    if (type === "category") {
      setCategories(categories.filter(c => c.id !== item.id));
    } else {
      setTags(tags.filter(t => t.id !== item.id));
    }
    
    toast({
      title: `${type === "category" ? "Category" : "Tag"} deleted`,
      description: `"${item.name}" has been deleted`
    });
  };
  
  const startEdit = (item: TagItem) => {
    setEditingItem(item);
    setEditName(item.name);
  };
  
  const saveEdit = () => {
    if (!editingItem || !editName.trim()) return;
    
    const slug = editName.toLowerCase().replace(/\s+/g, '-');
    
    if (activeTab === "categories") {
      setCategories(categories.map(c => 
        c.id === editingItem.id ? { ...c, name: editName, slug } : c
      ));
    } else {
      setTags(tags.map(t => 
        t.id === editingItem.id ? { ...t, name: editName, slug } : t
      ));
    }
    
    toast({
      title: `${activeTab === "categories" ? "Category" : "Tag"} updated`,
      description: `Name changed from "${editingItem.name}" to "${editName}"`
    });
    
    setEditingItem(null);
    setEditName("");
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Categories & Tags</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="tags">Tags</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-end gap-3">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="new-category">Add New Category</Label>
                  <Input 
                    id="new-category" 
                    placeholder="Category name" 
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddCategory} disabled={!newCategoryName.trim()}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Categories are used as the primary classification for products and affect navigation.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="border rounded-md p-3 flex items-center justify-between"
              >
                {editingItem?.id === category.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <Input 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-8"
                    />
                    <Button size="sm" variant="outline" onClick={saveEdit}>
                      <Save className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1">
                    <div className="font-medium" onDoubleClick={() => startEdit(category)}>
                      {category.name}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span>/{category.slug}</span>
                      <Badge variant="secondary" className="h-5 px-1">
                        {category.count}
                      </Badge>
                    </div>
                  </div>
                )}
                
                {editingItem?.id !== category.id && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0"
                    onClick={() => handleDelete(category, "category")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="tags">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-end gap-3">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="new-tag">Add New Tag</Label>
                  <Input 
                    id="new-tag" 
                    placeholder="Tag name" 
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddTag} disabled={!newTagName.trim()}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Tags help users discover related products and are used for filtering search results.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {tags.map((tag) => (
              <div 
                key={tag.id} 
                className="border rounded-md p-3 flex items-center justify-between"
              >
                {editingItem?.id === tag.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <Input 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-8"
                    />
                    <Button size="sm" variant="outline" onClick={saveEdit}>
                      <Save className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1">
                    <div className="font-medium" onDoubleClick={() => startEdit(tag)}>
                      {tag.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="h-5 px-1">
                        {tag.count}
                      </Badge>
                    </div>
                  </div>
                )}
                
                {editingItem?.id !== tag.id && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0"
                    onClick={() => handleDelete(tag, "tag")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
