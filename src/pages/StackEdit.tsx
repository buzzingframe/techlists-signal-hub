
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useStacks } from '@/hooks/useStacks';
import { UserStack } from '@/types/user';
import { Skeleton } from '@/components/ui/skeleton';

export default function StackEdit() {
  const { stackId } = useParams();
  const navigate = useNavigate();
  const { stacks } = useStacks();
  
  const [isLoading, setIsLoading] = useState(true);
  const [stack, setStack] = useState<UserStack | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  
  useEffect(() => {
    if (stacks.length > 0) {
      const currentStack = stacks.find(s => s.id === stackId);
      if (currentStack) {
        setStack(currentStack);
        setTitle(currentStack.title);
        setDescription(currentStack.description);
        setIsPublic(currentStack.isPublic);
      }
      setIsLoading(false);
    }
  }, [stackId, stacks]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would save changes to the stack
    navigate(`/stacks/${stackId}`);
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Edit Stack</CardTitle>
          </CardHeader>
          
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : stack ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Stack Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="public"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                  />
                  <Label htmlFor="public">Make this stack public</Label>
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full">
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <p>Stack not found</p>
                <Button
                  className="mt-4"
                  onClick={() => navigate('/profile')}
                >
                  Go to Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
