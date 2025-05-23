
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PricingTier {
  name: string;
  price: string;
  features: string[];
}

interface PricingTableProps {
  pricing: {
    free: PricingTier;
    pro: PricingTier;
    enterprise: PricingTier;
  };
}

export function PricingTable({ pricing }: PricingTableProps) {
  const tiers = [pricing.free, pricing.pro, pricing.enterprise];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier, index) => (
        <div 
          key={tier.name}
          className={`rounded-lg border p-6 shadow-sm transition-all ${
            index === 1 ? "border-blue-200 dark:border-blue-900 relative" : ""
          }`}
        >
          {index === 1 && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-blue-600">Popular</Badge>
            </div>
          )}
          
          <div className="mb-4">
            <h3 className="text-xl font-bold">{tier.name}</h3>
            
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-bold">{tier.price}</span>
              {tier.price !== "Custom" && <span className="text-muted-foreground ml-1">/month</span>}
            </div>
          </div>
          
          {tier.name === "Free" && (
            <Badge variant="outline" className="mb-4 text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-900">
              Free Tier Available
            </Badge>
          )}
          
          <ul className="space-y-3 mt-6">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
