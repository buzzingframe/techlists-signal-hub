
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, GripVertical } from "lucide-react";

export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface FeatureBuilderProps {
  features: ProductFeature[];
  onChange: (features: ProductFeature[]) => void;
  maxFeatures?: number;
}

export function FeatureBuilder({ features, onChange, maxFeatures = 10 }: FeatureBuilderProps) {
  const addFeature = () => {
    if (features.length < maxFeatures) {
      const newFeature: ProductFeature = {
        id: Date.now().toString(),
        title: "",
        description: "",
        icon: "⭐"
      };
      onChange([...features, newFeature]);
    }
  };

  const removeFeature = (id: string) => {
    onChange(features.filter(feature => feature.id !== id));
  };

  const updateFeature = (id: string, field: keyof ProductFeature, value: string) => {
    onChange(features.map(feature => 
      feature.id === id ? { ...feature, [field]: value } : feature
    ));
  };

  const moveFeature = (fromIndex: number, toIndex: number) => {
    const newFeatures = [...features];
    const [removed] = newFeatures.splice(fromIndex, 1);
    newFeatures.splice(toIndex, 0, removed);
    onChange(newFeatures);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Key Features</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addFeature}
          disabled={features.length >= maxFeatures}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {features.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              No features added yet. Click "Add Feature" to get started.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {features.map((feature, index) => (
          <Card key={feature.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                <CardTitle className="text-sm">Feature {index + 1}</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFeature(feature.id)}
                  className="ml-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label className="text-sm font-medium">Icon</label>
                  <Input
                    placeholder="⭐"
                    value={feature.icon || ""}
                    onChange={(e) => updateFeature(feature.id, "icon", e.target.value)}
                    className="text-center"
                    maxLength={2}
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Feature title"
                    value={feature.title}
                    onChange={(e) => updateFeature(feature.id, "title", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe this feature and its benefits..."
                  value={feature.description}
                  onChange={(e) => updateFeature(feature.id, "description", e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
