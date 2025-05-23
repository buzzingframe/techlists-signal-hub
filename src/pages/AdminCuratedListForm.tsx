
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { X, Plus } from "lucide-react";

export default function AdminCuratedListForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTag = () => {
    if (tag.trim() !== "" && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tag.trim() !== "") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here we would normally save to Supabase
    // In this mock version, we just wait and redirect
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log({
        title,
        description,
        isPinned,
        coverImage,
        tags,
        createdBy: "Current Admin User",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        productIds: []
      });
      
      // Redirect to the list management page
      navigate("/curated-lists");
    } catch (error) {
      console.error("Error creating list:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Create Curated List</h1>
            
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">List Title</Label>
                    <Input 
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="E.g., Essential Dev Tools for Beginners"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="A brief description of what this list is about..."
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input 
                      id="coverImage"
                      type="url"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-xs text-muted-foreground">Optional: Add a cover image URL (recommended ratio 2:1)</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="tags"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Add tags..."
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleAddTag}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((t) => (
                        <Badge key={t} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                          {t}
                          <button 
                            type="button" 
                            onClick={() => handleRemoveTag(t)}
                            className="rounded-full hover:bg-accent hover:text-accent-foreground h-4 w-4 inline-flex items-center justify-center"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {t}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="pinned" 
                      checked={isPinned}
                      onCheckedChange={setIsPinned}
                    />
                    <Label htmlFor="pinned">Pin this list to homepage</Label>
                  </div>
                  
                  <div className="pt-4 flex justify-end space-x-2">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/curated-lists")}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Creating..." : "Create List"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>After creating the list, you'll be able to add products to it.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
