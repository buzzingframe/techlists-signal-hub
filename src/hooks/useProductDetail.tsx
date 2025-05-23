
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { mockProductData } from "@/components/product/mockProductData";

export function useProductDetail(productId?: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0);
    
    // In a real app, we would fetch the product data based on productId
    // For now we'll just use our mock data after a short delay to simulate loading
    const timer = setTimeout(() => {
      setProduct(mockProductData);
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [productId]);
  
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
