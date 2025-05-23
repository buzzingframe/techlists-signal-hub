
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { NewsItem, NewsTag, NEWS_TAGS } from "@/types/news";
import { ChevronLeft } from "lucide-react";

export default function AdminNewsEditor() {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = Boolean(articleId);
  
  const [article, setArticle] = useState<Partial<NewsItem>>({
    title: "",
    slug: "",
    summary: "",
    content: "",
    tag: "announcement" as NewsTag,
    readTime: "",
    author: "",
    publishedAt: new Date().toISOString().split("T")[0],
  });
  
  useEffect(() => {
    if (isEditing) {
      // In a real app, this would fetch the article data from the API
      // For demo purposes, we'll use mock data
      
      // Simulate API delay
      const fetchArticle = async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        // This would be replaced with actual API call
        const mockArticle: NewsItem = {
          id: "1",
          title: "DeFi Protocol Security Audit Results",
          slug: "defi-protocol-security-audit-results",
          summary: "Major findings from the latest security audits across leading DeFi protocols reveal important insights for developers and users.",
          content: `<p class="lead">Security researchers have identified several patterns of vulnerabilities across popular DeFi protocols in the latest round of comprehensive audits.</p>
          <p>The findings, published yesterday by blockchain security firm ChainShield, highlight recurring issues in smart contract implementations that could potentially lead to fund loss or protocol manipulation.</p>`,
          tag: "security",
          author: "Alex Rivers",
          readTime: "3 min",
          publishedAt: "2025-05-18"
        };
        
        setArticle(mockArticle);
      };
      
      fetchArticle();
    }
  }, [isEditing, articleId]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setArticle(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setArticle(prev => ({ ...prev, [name]: value }));
  };
  
  const generateSlug = () => {
    if (article.title) {
      const slug = article.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
        
      setArticle(prev => ({ ...prev, slug }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!article.title || !article.slug || !article.summary || !article.content || !article.tag) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // In a real app, this would save to the database
      // For demo purposes, we'll simulate success
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      toast({
        title: isEditing ? "Article updated" : "Article published",
        description: `"${article.title}" has been ${isEditing ? 'updated' : 'published'} successfully.`,
      });
      
      navigate("/admin/news");
    } catch (error) {
      console.error("Error saving article:", error);
      toast({
        title: "Failed to save article",
        description: "An error occurred while saving the article.",
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
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-0 h-auto font-medium"
                onClick={() => navigate("/admin")}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Admin
              </Button>
              <h1 className="text-2xl font-bold">{isEditing ? 'Edit Article' : 'New Article'}</h1>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Article Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title*</Label>
                  <Input
                    id="title"
                    name="title"
                    value={article.title}
                    onChange={handleInputChange}
                    placeholder="Article title"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug*</Label>
                  <div className="flex gap-2">
                    <Input
                      id="slug"
                      name="slug"
                      value={article.slug}
                      onChange={handleInputChange}
                      placeholder="article-url-slug"
                      required
                    />
                    <Button 
                      type="button" 
                      variant="secondary" 
                      onClick={generateSlug}
                      className="whitespace-nowrap"
                    >
                      Generate
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    value={article.author}
                    onChange={handleInputChange}
                    placeholder="Article author"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tag">Category*</Label>
                  <Select 
                    name="tag" 
                    value={article.tag} 
                    onValueChange={(value) => handleSelectChange("tag", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {NEWS_TAGS.map((tag) => (
                        <SelectItem key={tag.value} value={tag.value}>
                          {tag.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="publishedAt">Publish Date*</Label>
                  <Input
                    id="publishedAt"
                    name="publishedAt"
                    type="date"
                    value={article.publishedAt}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="readTime">Read Time*</Label>
                  <Input
                    id="readTime"
                    name="readTime"
                    value={article.readTime}
                    onChange={handleInputChange}
                    placeholder="e.g., 5 min"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="summary">Summary* (80-120 characters)</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  value={article.summary}
                  onChange={handleInputChange}
                  placeholder="Brief summary of the article"
                  required
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  {article.summary?.length || 0} characters
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="content">Content* (HTML)</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={article.content}
                  onChange={handleInputChange}
                  placeholder="Write your article content in HTML"
                  required
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/news")}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update Article' : 'Publish Article'}
            </Button>
          </div>
        </form>
      </main>
      
      <Footer />
    </div>
  );
}
