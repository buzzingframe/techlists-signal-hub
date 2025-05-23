
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";

interface ProductMetaOverviewProps {
  product: Product;
}

export function ProductMetaOverview({ product }: ProductMetaOverviewProps) {
  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Pricing Model</h3>
            <p className="font-medium">{product.price}</p>
          </div>
          
          {product.useCase && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Use Cases</h3>
              <div className="flex flex-wrap gap-2">
                {product.useCase.map((useCase, index) => (
                  <Badge key={index} variant="secondary">
                    {useCase}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {product.reviewerPersona && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Reviewer</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                  {product.reviewerPersona}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
