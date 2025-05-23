
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUploadZone } from "../FileUploadZone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MediaStepProps {
  form: UseFormReturn<any>;
  logoFile: File | null;
  setLogoFile: (file: File | null) => void;
  mediaFiles: File[];
  setMediaFiles: (files: File[]) => void;
}

export function MediaStep({ form, logoFile, setLogoFile, mediaFiles, setMediaFiles }: MediaStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Logo Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploadZone
            onFilesSelected={(files) => setLogoFile(files[0] || null)}
            acceptedTypes={["image/*"]}
            maxFiles={1}
            maxSize={5}
            currentFiles={logoFile ? [logoFile] : []}
            className="mb-4"
          />
          <p className="text-sm text-muted-foreground">
            Upload your product logo. Recommended size: 256x256px or larger, square aspect ratio.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Screenshots & Media</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploadZone
            onFilesSelected={setMediaFiles}
            acceptedTypes={["image/*"]}
            maxFiles={8}
            maxSize={10}
            currentFiles={mediaFiles}
            className="mb-4"
          />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Upload screenshots, interface previews, or other visual content that showcases your product.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Screenshots</Badge>
              <Badge variant="outline">Product demos</Badge>
              <Badge variant="outline">Interface previews</Badge>
              <Badge variant="outline">Feature highlights</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Video & Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="demoVideo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo Video URL (Optional)</FormLabel>
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Repository (Optional)</FormLabel>
                <Input
                  placeholder="https://github.com/username/repo"
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
