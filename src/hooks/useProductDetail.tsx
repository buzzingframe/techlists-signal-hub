
import { useState, useEffect, useCallback, useMemo } from "react";
import { Product } from "@/types/product";
import { useProduct } from "@/hooks/useProducts";
import { useSavedProducts } from "@/hooks/useSavedProducts";
import { supabase } from "@/integrations/supabase/client";

interface UseProductDetailOptions {
  enabled?: boolean;
}

export function useProductDetail(productId?: string, options?: UseProductDetailOptions) {
  const [user, setUser] = useState<any>(null);
  
  // Get current user
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  // Memoize the enabled state to prevent unnecessary re-renders
  const isEnabled = useMemo(() => 
    options?.enabled !== undefined ? options.enabled : true, 
    [options?.enabled]
  );
  
  // Fetch product data
  const { product, isLoading, error } = useProduct(productId || '');
  
  // Handle saved products
  const { isProductSaved, toggleSaveProduct, isSaving } = useSavedProducts(user?.id);
  const isSaved = productId ? isProductSaved(productId) : false;
  
  // Memoize the handle save function
  const handleSave = useCallback(() => {
    if (productId && user) {
      toggleSaveProduct(productId);
    } else {
      console.log('Please log in to save products');
    }
  }, [productId, user, toggleSaveProduct]);
  
  // Memoize the review submitted handler
  const handleReviewSubmitted = useCallback(() => {
    console.log("Review submitted successfully");
  }, []);
  
  useEffect(() => {
    // Skip if not enabled or no productId
    if (!isEnabled || !productId) {
      return;
    }
    
    // Scroll to top only on full page (not in modal)
    if (!options?.enabled) {
      window.scrollTo(0, 0);
    }
  }, [productId, isEnabled, options?.enabled]);
  
  return useMemo(() => ({
    product,
    isLoading: isLoading || isSaving,
    error,
    isSaved,
    handleSave,
    handleReviewSubmitted
  }), [product, isLoading, isSaving, error, isSaved, handleSave, handleReviewSubmitted]);
}
