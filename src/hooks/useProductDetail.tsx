
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
  
  const isEnabled = options?.enabled !== undefined ? options.enabled : true;
  
  useEffect(() => {
    // Skip fetching if not enabled
    if (!isEnabled) {
      setIsLoading(false);
      return;
    }
    
    // Scroll to top when the page loads (only on full page, not in modal)
    if (!options) {
      window.scrollTo(0, 0);
    }
    
    // Reset state when product ID changes
    setIsLoading(true);
    setProduct(null);
    
    // In a real app, we would fetch the product data based on productId
    // For now we'll just use our mock data after a short delay to simulate loading
    const timer = setTimeout(() => {
      setProduct(mockProductData);
      setIsLoading(false);
    }, 100);
    
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
    isSaved,
    handleSave,
    handleReviewSubmitted
  };
}
