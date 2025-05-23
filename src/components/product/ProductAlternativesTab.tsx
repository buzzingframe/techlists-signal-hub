
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";

interface ProductAlternativesTabProps {
  alternatives: Product[];
}

export function ProductAlternativesTab({ alternatives }: ProductAlternativesTabProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {alternatives.map((alt) => (
          <ProductCard key={alt.id} product={alt} className="h-full" />
        ))}
      </div>
    </section>
  );
}
