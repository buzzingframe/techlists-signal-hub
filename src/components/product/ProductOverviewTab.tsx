
import { ProductMediaCarousel } from "@/components/ProductMediaCarousel";
import { FeatureGrid } from "@/components/FeatureGrid";
import { ProductFeature, Media } from "@/types/product";

// Adding type definitions for compatibility with imported components
type MediaWithRequiredCaption = {
  type: "image" | "video";
  url: string;
  caption: string; // Required in MediaCarousel
};

type FeatureWithRequiredExpanded = {
  title: string;
  icon: string;
  description: string;
  expanded: string; // Required in FeatureGrid
};

interface ProductOverviewTabProps {
  features?: ProductFeature[];
  media?: Media[];
}

export function ProductOverviewTab({ features, media }: ProductOverviewTabProps) {
  // Convert media and features to the required format
  const formattedMedia = media?.map(item => ({
    ...item,
    caption: item.caption || '' // Ensure caption is always present
  })) as MediaWithRequiredCaption[];

  const formattedFeatures = features?.map(feature => ({
    ...feature,
    expanded: feature.expanded || '' // Ensure expanded is always present
  })) as FeatureWithRequiredExpanded[];

  return (
    <div className="space-y-8">
      {/* Media Carousel */}
      {media && media.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Product Tour</h2>
          <ProductMediaCarousel media={formattedMedia} />
        </section>
      )}
      
      {/* Features */}
      {features && features.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Key Features</h2>
          <FeatureGrid features={formattedFeatures} />
        </section>
      )}
    </div>
  );
}
