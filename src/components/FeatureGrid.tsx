
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Feature {
  title: string;
  icon: string;
  description: string;
  expanded: string;
}

interface FeatureGridProps {
  features: Feature[];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  const [expandedFeatures, setExpandedFeatures] = useState<Record<string, boolean>>({});
  
  const toggleFeature = (title: string) => {
    setExpandedFeatures(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature) => (
        <div 
          key={feature.title}
          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-1">{feature.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {feature.description}
              </p>
              
              {expandedFeatures[feature.title] && (
                <div className="mt-3 text-sm border-t pt-3">
                  {feature.expanded}
                </div>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 h-8 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => toggleFeature(feature.title)}
              >
                {expandedFeatures[feature.title] ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    Learn More
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
