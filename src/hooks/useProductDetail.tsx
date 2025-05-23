
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { mockProductData } from "@/components/product/mockProductData";

interface UseProductDetailOptions {
  enabled?: boolean;
}

export function useProductDetail(productId?: string, options?: UseProductDetailOptions) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isEnabled = options?.enabled !== undefined ? options.enabled : true;
  
  useEffect(() => {
    // Skip fetching if not enabled or no productId
    if (!isEnabled || !productId) {
      setIsLoading(false);
      return;
    }
    
    // Reset state when product ID changes
    setIsLoading(true);
    setProduct(null);
    setError(null);
    
    // Scroll to top when the page loads (only on full page, not in modal)
    if (!options) {
      window.scrollTo(0, 0);
    }
    
    // In a real app, we would fetch the product data based on productId
    // For now we'll just use our mock data after a short delay to simulate loading
    const timer = setTimeout(() => {
      try {
        // In a real app, this would be a fetch call to get the specific product
        // For now, we'll use mock data
        setProduct(mockProductData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load product data");
        setIsLoading(false);
      }
    }, 600); // Slightly longer delay to make loading state visible
    
    return () => clearTimeout(timer);
  }, [productId, isEnabled, options]);
  
  const handleSave = () => {
    setIsSaved(!isSaved);
  };
  
  const handleReviewSubmitted = () => {
    // In a real app, you would refresh the reviews data here
    console.log("Review submitted successfully");
  };
  
  return {
    product,
    isLoading,
    error,
    isSaved,
    handleSave,
    handleReviewSubmitted
  };
}
