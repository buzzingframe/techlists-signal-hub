
import { useState, useMemo } from "react";
import { Product } from "@/types/product";

export function useProductsFilter(products: Product[]) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("signalScore");

  // Extract unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return uniqueCategories.sort();
  }, [products]);

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]);

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    if (!filteredProducts.length) return [];
    
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "signalScore":
          return b.signalScore - a.signalScore;
        case "alphabetical":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "newest":
          // For now, use signal score as a proxy for newness
          return b.signalScore - a.signalScore;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  return {
    categories,
    selectedCategory,
    sortBy,
    sortedProducts,
    filteredProducts,
    handleCategoryChange,
    handleSortChange,
    totalProducts: products.length,
    filteredCount: filteredProducts.length
  };
}
