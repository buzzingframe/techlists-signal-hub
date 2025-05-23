
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ProductFeature } from "../FeatureBuilder";

interface ReviewStepProps {
  form: UseFormReturn<any>;
  logoFile: File | null;
  mediaFiles: File[];
  features: ProductFeature[];
}

export function ReviewStep({ form, logoFile, mediaFiles, features }: ReviewStepProps) {
  const formData = form.getValues();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Review Your Submission</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Product Name</h4>
              <p className="text-muted-foreground">{formData.name || "Not provided"}</p>
            </div>
            <div>
              <h4 className="font-medium">Website</h4>
              <p className="text-muted-foreground">{formData.website || "Not provided"}</p>
            </div>
            <div>
              <h4 className="font-medium">Category</h4>
              <Badge variant="secondary">{formData.category || "Not selected"}</Badge>
            </div>
            <div>
              <h4 className="font-medium">Pricing</h4>
              <Badge variant="outline">{formData.price || "Not selected"}</Badge>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-muted-foreground">{formData.description || "Not provided"}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Media Files</h4>
            <div className="flex gap-2 flex-wrap">
              {logoFile && <Badge>Logo: {logoFile.name}</Badge>}
              {mediaFiles.map((file, index) => (
                <Badge key={index} variant="outline">
                  {file.name}
                </Badge>
              ))}
              {!logoFile && mediaFiles.length === 0 && (
                <p className="text-muted-foreground">No media files uploaded</p>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Features ({features.length})</h4>
            {features.length > 0 ? (
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={feature.id} className="flex items-start gap-2">
                    <span>{feature.icon}</span>
                    <div>
                      <p className="font-medium">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No features added</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email *</FormLabel>
                <Input
                  type="email"
                  placeholder="email@example.com"
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
