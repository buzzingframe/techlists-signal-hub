
import { Button } from "@/components/ui/button";
import { PricingTable } from "@/components/PricingTable";

interface ProductPricingTabProps {
  pricing: Record<string, {
    name: string;
    price: string;
    features: string[];
  }>;
}

export function ProductPricingTab({ pricing }: ProductPricingTabProps) {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Pricing Plans</h2>
      <PricingTable pricing={pricing} />
      
      <div className="mt-6 text-center">
        <Button>
          Compare with Other Tools
        </Button>
      </div>
    </section>
  );
}
