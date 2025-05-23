
import { Button } from "@/components/ui/button";
import { PricingTable } from "@/components/PricingTable";

// Define the pricing format required by PricingTable
interface PricingTier {
  name: string;
  price: string;
  features: string[];
}

interface PricingFormat {
  free: PricingTier;
  pro: PricingTier;
  enterprise: PricingTier;
}

interface ProductPricingTabProps {
  pricing?: Record<string, {
    name: string;
    price: string;
    features: string[];
  }>;
}

export function ProductPricingTab({ pricing = {} }: ProductPricingTabProps) {
  // Convert the pricing data to the format expected by PricingTable
  const formattedPricing: PricingFormat = {
    free: pricing.free || {
      name: "Free",
      price: "Free",
      features: ["Basic features", "Community support"]
    },
    pro: pricing.pro || {
      name: "Pro",
      price: "$29/month",
      features: ["Advanced features", "Priority support", "Analytics"]
    },
    enterprise: pricing.enterprise || {
      name: "Enterprise",
      price: "Contact us",
      features: ["All features", "Custom integrations", "Dedicated support"]
    }
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Pricing Plans</h2>
      <PricingTable pricing={formattedPricing} />
      
      <div className="mt-6 text-center">
        <Button>
          Compare with Other Tools
        </Button>
      </div>
    </section>
  );
}
