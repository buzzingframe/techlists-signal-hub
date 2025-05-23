
import { ProductMediaCarousel } from "@/components/ProductMediaCarousel";
import { FeatureGrid } from "@/components/FeatureGrid";
import { ProductFeature, Media } from "@/types/product";

interface ProductOverviewTabProps {
  features?: ProductFeature[];
  media?: Media[];
}

export function ProductOverviewTab({ features, media }: ProductOverviewTabProps) {
  return (
    <div className="space-y-8">
      {/* Media Carousel */}
      {media && media.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Product Tour</h2>
          <ProductMediaCarousel media={media} />
        </section>
      )}
      
      {/* Features */}
      {features && features.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Key Features</h2>
          <FeatureGrid features={features} />
        </section>
      )}
    </div>
  );
}
