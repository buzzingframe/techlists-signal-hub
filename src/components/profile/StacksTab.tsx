
import { useState } from "react";
import { UserStack } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Eye, EyeOff, Pencil, Trash2, Plus } from "lucide-react";
import { StackCreationModal } from "@/components/stack/StackCreationModal";
import { Link } from "react-router-dom";

interface StacksTabProps {
  stacks: UserStack[];
  onToggleVisibility: (stackId: string) => void;
  onDeleteStack: (stackId: string) => void;
}

export function StacksTab({ stacks, onToggleVisibility, onDeleteStack }: StacksTabProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">My Stacks</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Create Stack
        </Button>
      </div>

      {stacks.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stacks.map((stack) => (
            <Card key={stack.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{stack.title}</CardTitle>
                  <Badge variant={stack.isPublic ? "outline" : "secondary"} className="ml-2">
                    {stack.isPublic ? "Public" : "Private"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className="text-muted-foreground text-sm">
                  {stack.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Created {formatDistanceToNow(new Date(stack.createdAt), { addSuffix: true })}
                </p>
                <div className="mt-2">
                  <Badge variant="outline" className="mr-2">
                    {stack.productIds.length} products
                  </Badge>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2">
                <div>
                  <Button variant="ghost" size="sm" onClick={() => onToggleVisibility(stack.id)}>
                    {stack.isPublic ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-1" />
                        Make Private
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-1" />
                        Make Public
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Link to={`/stacks/${stack.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Link to={`/stacks/${stack.id}/edit`}>
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-600"
                    onClick={() => onDeleteStack(stack.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-6">
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center mb-4">
              <Layers className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No stacks yet</h3>
            <p className="text-muted-foreground">
              Create a stack to group products together and share with others.
            </p>
            <Button className="mt-4" onClick={() => setIsCreateModalOpen(true)}>
              Create Your First Stack
            </Button>
          </CardContent>
        </Card>
      )}

      <StackCreationModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
}
