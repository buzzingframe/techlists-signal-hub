
import { useState, useEffect, useCallback, useMemo } from "react";
import { useProduct } from "@/hooks/useProducts";
import { useSavedProducts } from "@/hooks/useSavedProducts";
import { supabase } from "@/integrations/supabase/client";

interface UseProductDetailOptions {
  enabled?: boolean;
}

export function useProductDetail(productId?: string, options?: UseProductDetailOptions) {
  const [user, setUser] = useState<any>(null);
  
  // Get current user - memoize to prevent unnecessary re-renders
  useEffect(() => {
    let mounted = true;
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (mounted) {
        setUser(user);
      }
    };
    
    getUser();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Memoize the enabled state to prevent unnecessary re-renders
  const isEnabled = useMemo(() => 
    options?.enabled !== undefined ? options.enabled : Boolean(productId), 
    [options?.enabled, productId]
  );
  
  // Fetch product data
  const { product, isLoading, error } = useProduct(productId || '');
  
  // Handle saved products
  const { isProductSaved, toggleSaveProduct, isSaving } = useSavedProducts(user?.id);
  const isSaved = useMemo(() => 
    productId ? isProductSaved(productId) : false, 
    [productId, isProductSaved]
  );
  
  // Memoize the handle save function
  const handleSave = useCallback(() => {
    if (productId && user) {
      toggleSaveProduct(productId);
    } else if (!user) {
      console.log('Please log in to save products');
    }
  }, [productId, user, toggleSaveProduct]);
  
  // Memoize the review submitted handler
  const handleReviewSubmitted = useCallback(() => {
    console.log("Review submitted successfully");
  }, []);
  
  // Handle scroll to top for full page views
  useEffect(() => {
    if (!isEnabled || !productId) {
      return;
    }
    
    // Only scroll to top if this is a full page view (not in modal)
    if (options?.enabled === undefined) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
