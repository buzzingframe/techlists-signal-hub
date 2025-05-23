
import { useState, useEffect, useCallback, useMemo } from "react";
import { Product } from "@/types/product";
import { mockProductData } from "@/components/product/mockProductData";

interface UseProductDetailOptions {
  enabled?: boolean;
}

export function useProductDetail(productId?: string, options?: UseProductDetailOptions) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Memoize the enabled state to prevent unnecessary re-renders
  const isEnabled = useMemo(() => 
    options?.enabled !== undefined ? options.enabled : true, 
    [options?.enabled]
  );
  
  // Memoize the handle save function
  const handleSave = useCallback(() => {
    setIsSaved(prev => !prev);
    console.log(`Product ${isSaved ? 'unsaved' : 'saved'}`);
  }, [isSaved]);
  
  // Memoize the review submitted handler
  const handleReviewSubmitted = useCallback(() => {
    console.log("Review submitted successfully");
  }, []);
  
  useEffect(() => {
    // Skip if not enabled or no productId
    if (!isEnabled || !productId) {
      setIsLoading(false);
      setProduct(null);
      setError(null);
      return;
    }
    
    // Prevent duplicate fetches for the same product
    if (product && product.id === productId) {
      return;
    }
    
    // Reset state when product ID changes
    setIsLoading(true);
    setProduct(null);
    setError(null);
    
    // Scroll to top only on full page (not in modal)
    if (!options?.enabled) {
      window.scrollTo(0, 0);
    }
    
    console.log(`Fetching product data for ID: ${productId}`);
    
    // Use AbortController to cancel previous requests
    const abortController = new AbortController();
    
    const timer = setTimeout(() => {
      if (!abortController.signal.aborted) {
        try {
          setProduct(mockProductData);
          setIsLoading(false);
          console.log("Product data loaded successfully");
        } catch (err) {
          if (!abortController.signal.aborted) {
            setError("Failed to load product data");
            setIsLoading(false);
            console.error("Error loading product data:", err);
          }
        }
      }
    }, 600);
    
    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [productId, isEnabled, options?.enabled, product?.id]); // More specific dependencies
  
  return useMemo(() => ({
    product,
    isLoading,
    error,
    isSaved,
    handleSave,
    handleReviewSubmitted
  }), [product, isLoading, error, isSaved, handleSave, handleReviewSubmitted]);
}
