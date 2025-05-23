
import { UseFormReturn } from "react-hook-form";
import { FeatureBuilder, ProductFeature } from "../FeatureBuilder";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FeaturesStepProps {
  form: UseFormReturn<any>;
  features: ProductFeature[];
  setFeatures: (features: ProductFeature[]) => void;
}

export function FeaturesStep({ form, features, setFeatures }: FeaturesStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <FeatureBuilder
            features={features}
            onChange={setFeatures}
            maxFeatures={8}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="technicalDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Specifications (Optional)</FormLabel>
                <Textarea
                  placeholder="Blockchain compatibility, programming languages, APIs, integrations, etc."
                  className="min-h-[100px]"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="integrations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Integrations & Compatibility (Optional)</FormLabel>
                <Textarea
                  placeholder="What other tools, platforms, or services does this integrate with?"
                  className="min-h-[80px]"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
