
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UserStack } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types/product";

interface StackCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  existingStacks: UserStack[];
  onCreateStack: (stack: { title: string; description: string; isPublic: boolean }) => Promise<string>;
  onAddToStack: (stackId: string, productId: string) => Promise<void>;
}

export function StackCreationModal({
  isOpen,
  onClose,
  product,
  existingStacks,
  onCreateStack,
  onAddToStack,
}: StackCreationModalProps) {
  const { toast } = useToast();
  const [mode, setMode] = useState<"new" | "existing">(existingStacks.length > 0 ? "existing" : "new");
  const [selectedStackId, setSelectedStackId] = useState<string>(existingStacks[0]?.id || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New stack form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async () => {
    if (!product) return;
    
    setIsSubmitting(true);
    
    try {
      if (mode === "new") {
        if (!title) {
          toast({
            title: "Stack name required",
            description: "Please enter a name for your stack",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        
        const newStackId = await onCreateStack({
          title,
          description,
          isPublic,
        });
        
        await onAddToStack(newStackId, product.id);
        
        toast({
          title: "Stack created",
          description: `Added ${product.name} to your new stack "${title}"`,
        });
      } else {
        if (!selectedStackId) {
          toast({
            title: "Select a stack",
            description: "Please select a stack to add this product to",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        
        await onAddToStack(selectedStackId, product.id);
        
        const stackName = existingStacks.find(s => s.id === selectedStackId)?.title || "selected stack";
        toast({
          title: "Product added",
          description: `Added ${product.name} to "${stackName}"`,
        });
      }
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product to stack. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to Stack</DialogTitle>
          <DialogDescription>
            Add this product to an existing stack or create a new one.
          </DialogDescription>
        </DialogHeader>
        
        {existingStacks.length > 0 && (
          <div className="flex gap-4 mb-4">
            <Button 
              variant={mode === "existing" ? "default" : "outline"} 
              onClick={() => setMode("existing")}
              className="flex-1"
            >
              Existing Stack
            </Button>
            <Button 
              variant={mode === "new" ? "default" : "outline"} 
              onClick={() => setMode("new")}
              className="flex-1"
            >
              New Stack
            </Button>
          </div>
        )}
        
        {mode === "existing" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select a stack</Label>
              <RadioGroup value={selectedStackId} onValueChange={setSelectedStackId}>
                {existingStacks.map((stack) => (
                  <div key={stack.id} className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value={stack.id} id={stack.id} />
                    <Label htmlFor={stack.id} className="flex-1 cursor-pointer">
                      <div className="font-medium">{stack.title}</div>
                      <div className="text-sm text-muted-foreground">{stack.description}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Stack Name</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g., My NFT Tools" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="What's this stack for?" 
                rows={3} 
              />
            </div>
            <div className="space-y-2">
              <Label>Visibility</Label>
              <RadioGroup 
                value={isPublic ? "public" : "private"} 
                onValueChange={(val) => setIsPublic(val === "public")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Public - Anyone can view this stack</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private">Private - Only you can view this stack</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
