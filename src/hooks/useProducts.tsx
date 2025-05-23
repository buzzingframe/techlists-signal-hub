
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { productService } from "@/services/productService";

export function useProducts() {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAllProducts,
  });

  return { products, isLoading, error };
}

export function useProduct(productId: string) {
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productService.getProductById(productId),
    enabled: !!productId,
  });

  return { product, isLoading, error };
}

export function useProductsByIds(productIds: string[]) {
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products', 'by-ids', productIds],
    queryFn: () => productService.getProductsByIds(productIds),
    enabled: productIds.length > 0,
  });

  return { products, isLoading, error };
}
