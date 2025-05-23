
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { productService } from "@/services/productService";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export function useProducts() {
  const { isOnline } = useNetworkStatus();
  
  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAllProducts,
    retry: (failureCount, error) => {
      // Don't retry if offline
      if (!navigator.onLine) return false;
      // Retry up to 3 times for network errors
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: isOnline,
  });

  return { 
    products, 
    isLoading, 
    error: error as Error | null, 
    refetch,
    isOffline: !isOnline 
  };
}

export function useProduct(productId: string) {
  const { isOnline } = useNetworkStatus();
  const [validationError, setValidationError] = useState<string | null>(null);

  // Validate product ID format
  useEffect(() => {
    if (!productId) {
      setValidationError("Product ID is required");
      return;
    }
    
    // Basic UUID validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(productId)) {
      setValidationError("Invalid product ID format");
      return;
    }
    
    setValidationError(null);
  }, [productId]);

  const { data: product, isLoading, error, refetch } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productService.getProductById(productId),
    enabled: !!productId && !validationError && isOnline,
    retry: (failureCount, error) => {
      // Don't retry for 404s or validation errors
      if (!navigator.onLine || validationError) return false;
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000,
  });

  const finalError = validationError || error;

  return { 
    product, 
    isLoading: isLoading && !validationError, 
    error: finalError as Error | string | null,
    refetch,
    isOffline: !isOnline
  };
}

export function useProductsByIds(productIds: string[]) {
  const { isOnline } = useNetworkStatus();
  
  const { data: products = [], isLoading, error, refetch } = useQuery({
    queryKey: ['products', 'by-ids', productIds],
    queryFn: () => productService.getProductsByIds(productIds),
    enabled: productIds.length > 0 && isOnline,
    retry: (failureCount) => {
      if (!navigator.onLine) return false;
      return failureCount < 3;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { 
    products, 
    isLoading, 
    error: error as Error | null, 
    refetch,
    isOffline: !isOnline 
  };
}
