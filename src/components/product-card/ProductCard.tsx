
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { StackCreationModal } from "@/components/stack/StackCreationModal";
import { useStacks } from "@/hooks/useStacks";
import { ProductCardHeader } from "./ProductCardHeader";
import { ProductCardBadges } from "./ProductCardBadges";
import { ProductCardFooter } from "./ProductCardFooter";

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    signalScore: number;
    logo: string;
    price: "Free" | "$" | "$$" | "Freemium";
    badges: string[];
    description: string;
  };
  className?: string;
  onViewDetails?: () => void;
}

export function ProductCard({ product, className, onViewDetails }: ProductCardProps) {
  const [stackModalOpen, setStackModalOpen] = useState(false);
  const { stacks, createStack, addProductToStack } = useStacks();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      // Default behavior - navigate to the product detail page
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div className={cn(
      "group relative bg-card rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden",
      className
    )}>
      {/* Product Header */}
      <div className="p-6 pb-4">
        <ProductCardHeader 
          logo={product.logo}
          name={product.name}
          category={product.category}
          signalScore={product.signalScore}
        />

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Badges */}
        <ProductCardBadges badges={product.badges} />

        {/* Footer with Price and Actions */}
        <ProductCardFooter 
          price={product.price}
          onAddToStack={() => setStackModalOpen(true)}
          onViewDetails={handleViewDetails}
        />
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Stack Creation Modal */}
      <StackCreationModal
        isOpen={stackModalOpen}
        onClose={() => setStackModalOpen(false)}
        product={product}
        existingStacks={stacks}
        onCreateStack={createStack}
        onAddToStack={addProductToStack}
      />
    </div>
  );
}
