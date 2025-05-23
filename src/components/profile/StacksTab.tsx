
import { UserStack } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Layers, Eye, EyeOff, Pencil, Trash2, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { StackCreationModal } from "@/components/stack/StackCreationModal";
import { useStacks } from "@/hooks/useStacks";

export function StacksTab() {
  const navigate = useNavigate();
  const { stacks, createStack, addProductToStack, toggleStackVisibility, deleteStack } = useStacks();
  const [newStackModalOpen, setNewStackModalOpen] = useState(false);
  
  const handleCreateStack = async (stackData: { title: string; description: string; isPublic: boolean }) => {
    const newStackId = await createStack(stackData);
    return newStackId;
  };
  
  const handleViewStack = (stackId: string) => {
    navigate(`/stacks/${stackId}`);
  };
  
  const handleEditStack = (stackId: string) => {
    navigate(`/stacks/${stackId}/edit`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">My Stacks</h2>
        <Button onClick={() => setNewStackModalOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />
          New Stack
        </Button>
      </div>

      {stacks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stacks.map((stack) => (
            <Card key={stack.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg">{stack.title}</h3>
                  <Badge variant="outline" className={stack.isPublic ? 
                    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30" : 
                    "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800/30"
                  }>
                    {stack.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{stack.description}</p>
                <p className="text-sm">
                  <span className="font-medium">{stack.productIds.length}</span>{" "}
                  <span className="text-muted-foreground">products in stack</span>
                </p>
              </CardContent>
              <CardFooter className="bg-muted/30 px-6 py-3 flex justify-between">
                <span className="text-xs text-muted-foreground">
                  Created {formatDistanceToNow(new Date(stack.createdAt), { addSuffix: true })}
                </span>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => toggleStackVisibility(stack.id)}
                  >
                    {stack.isPublic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => handleEditStack(stack.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => deleteStack(stack.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Layers className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No stacks created yet</h3>
            <CardDescription className="text-center">
              Create collections of your favorite tools to share with others.
            </CardDescription>
            <Button className="mt-4" onClick={() => setNewStackModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Create Your First Stack
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* New Stack Modal */}
      <StackCreationModal
        isOpen={newStackModalOpen}
        onClose={() => setNewStackModalOpen(false)}
        existingStacks={[]}
        onCreateStack={handleCreateStack}
        onAddToStack={addProductToStack}
      />
    </div>
  );
}
