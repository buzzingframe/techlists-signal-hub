
import { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "@/types/product";

interface ProductModalContextType {
  isModalOpen: boolean;
  productData: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
}

const ProductModalContext = createContext<ProductModalContextType>({
  isModalOpen: false,
  productData: null,
  openProductModal: () => {},
  closeProductModal: () => {},
});

export const useProductModal = () => useContext(ProductModalContext);

export const ProductModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productData, setProductData] = useState<Product | null>(null);

  const openProductModal = (product: Product) => {
    setProductData(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ProductModalContext.Provider
      value={{
        isModalOpen,
        productData,
        openProductModal,
        closeProductModal,
      }}
    >
      {children}
    </ProductModalContext.Provider>
  );
};
