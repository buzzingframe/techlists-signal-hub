
import { useState } from "react";
import { UserStack } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";

// In a real implementation, this would connect to Supabase
// For now, we'll use local state to demonstrate the functionality
const DEMO_STACKS: UserStack[] = [
  {
    id: "stack-1",
    title: "My DeFi Tools",
    description: "Tools I use for DeFi activities",
    productIds: ["product-1", "product-2"],
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "stack-2",
    title: "NFT Creation",
    description: "Everything needed for NFT projects",
    productIds: ["product-3"],
    isPublic: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export function useStacks() {
  const { toast } = useToast();
  const [stacks, setStacks] = useState<UserStack[]>(DEMO_STACKS);
  
  const createStack = async (stackData: {
    title: string;
    description: string;
    isPublic: boolean;
  }): Promise<string> => {
    // In a real implementation, this would create a stack in Supabase
    const newStack: UserStack = {
      id: `stack-${Date.now()}`,
      title: stackData.title,
      description: stackData.description,
      productIds: [],
      isPublic: stackData.isPublic,
      createdAt: new Date().toISOString(),
    };
    
    setStacks((prev) => [...prev, newStack]);
    return newStack.id;
  };
  
  const addProductToStack = async (stackId: string, productId: string): Promise<void> => {
    // In a real implementation, this would update a stack in Supabase
    setStacks((prev) => 
      prev.map((stack) => {
        if (stack.id === stackId && !stack.productIds.includes(productId)) {
          return {
            ...stack,
            productIds: [...stack.productIds, productId]
          };
        }
        return stack;
      })
    );
  };
  
  const toggleStackVisibility = (stackId: string) => {
    setStacks((prev) => 
      prev.map((stack) => {
        if (stack.id === stackId) {
          return {
            ...stack,
            isPublic: !stack.isPublic
          };
        }
        return stack;
      })
    );
    
    toast({
      title: "Visibility updated",
      description: "Stack visibility has been updated",
    });
  };
  
  const deleteStack = (stackId: string) => {
    setStacks((prev) => prev.filter((stack) => stack.id !== stackId));
    
    toast({
      title: "Stack deleted",
      description: "Your stack has been deleted",
    });
  };
  
  return {
    stacks,
    createStack,
    addProductToStack,
    toggleStackVisibility,
    deleteStack
  };
}
