
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { useToast } from "@/hooks/use-toast";

export function useSavedProducts(userId?: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: savedProductIds = [], isLoading } = useQuery({
    queryKey: ['saved-products', userId],
    queryFn: () => userService.getSavedProducts(userId!),
    enabled: !!userId,
  });

  const saveProductMutation = useMutation({
    mutationFn: ({ userId, productId }: { userId: string; productId: string }) =>
      userService.saveProduct(userId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-products'] });
      toast({
        title: "Product saved",
        description: "Product has been added to your saved list.",
      });
    },
    onError: (error) => {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const unsaveProductMutation = useMutation({
    mutationFn: ({ userId, productId }: { userId: string; productId: string }) =>
      userService.unsaveProduct(userId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-products'] });
      toast({
        title: "Product removed",
        description: "Product has been removed from your saved list.",
      });
    },
    onError: (error) => {
      console.error('Error unsaving product:', error);
      toast({
        title: "Error",
        description: "Failed to remove product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleSaveProduct = (productId: string) => {
    if (!userId) return;

    const isCurrentlySaved = savedProductIds.includes(productId);
    
    if (isCurrentlySaved) {
      unsaveProductMutation.mutate({ userId, productId });
    } else {
      saveProductMutation.mutate({ userId, productId });
    }
  };

  const isProductSaved = (productId: string) => {
    return savedProductIds.includes(productId);
  };

  return {
    savedProductIds,
    isLoading,
    toggleSaveProduct,
    isProductSaved,
    isSaving: saveProductMutation.isPending || unsaveProductMutation.isPending,
  };
}
