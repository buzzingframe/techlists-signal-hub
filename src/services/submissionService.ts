
import { supabase } from "@/integrations/supabase/client";
import { MediaService } from "./mediaService";
import { ProductFeature } from "@/components/submission/FeatureBuilder";

export interface EnhancedProductSubmission {
  name: string;
  website: string;
  category: string;
  description: string;
  useCase: string;
  price: "Free" | "$" | "$$" | "Freemium";
  email: string;
  demoVideo?: string;
  githubUrl?: string;
  technicalDetails?: string;
  integrations?: string;
}

export interface SubmissionWithMedia extends EnhancedProductSubmission {
  logoFile?: File;
  mediaFiles?: File[];
  features?: ProductFeature[];
}

export const submissionService = {
  async submitProduct(submission: SubmissionWithMedia) {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("You must be logged in to submit a product");
    }

    let logoUrl = null;
    let mediaUrls: string[] = [];

    try {
      // Upload logo if provided
      if (submission.logoFile) {
        logoUrl = await MediaService.uploadFile(submission.logoFile, 'logos');
      }

      // Upload media files if provided
      if (submission.mediaFiles && submission.mediaFiles.length > 0) {
        mediaUrls = await MediaService.uploadMultipleFiles(submission.mediaFiles, 'media');
      }

      // Prepare features data
      const featuresData = submission.features?.map(feature => ({
        title: feature.title,
        description: feature.description,
        icon: feature.icon
      })) || [];

      // Prepare media data
      const mediaData = mediaUrls.map((url, index) => ({
        type: 'image',
        url,
        caption: `Screenshot ${index + 1}`
      }));

      // Add demo video to media if provided
      if (submission.demoVideo) {
        mediaData.push({
          type: 'video',
          url: submission.demoVideo,
          caption: 'Demo Video'
        });
      }

      // Create a new product entry with pending status
      const { data, error } = await supabase
        .from('products')
        .insert({
          name: submission.name,
          website: submission.website,
          category: submission.category,
          description: submission.description,
          price: submission.price,
          use_case: [submission.useCase],
          signal_score: 0,
          badges: ['new'],
          logo: logoUrl ? '📦' : '📦', // Keep emoji for now, we have logo_url for actual image
          logo_url: logoUrl,
          editorial_summary: `New submission: ${submission.description}`,
          email: submission.email,
          status: 'pending',
          features: featuresData.length > 0 ? featuresData : null,
          media: mediaData.length > 0 ? mediaData : null,
          reviewer_persona: submission.technicalDetails || null
        })
        .select()
        .single();

      if (error) {
        // Clean up uploaded files if database insert fails
        if (logoUrl) {
          await MediaService.deleteFile(logoUrl).catch(console.error);
        }
        for (const url of mediaUrls) {
          await MediaService.deleteFile(url).catch(console.error);
        }
        console.error('Error submitting product:', error);
        throw error;
      }

      return data;
    } catch (error) {
      // Clean up uploaded files on any error
      if (logoUrl) {
        await MediaService.deleteFile(logoUrl).catch(console.error);
      }
      for (const url of mediaUrls) {
        await MediaService.deleteFile(url).catch(console.error);
      }
      throw error;
    }
  }
};
