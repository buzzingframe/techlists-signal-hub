
import { supabase } from "@/integrations/supabase/client";

export class MediaService {
  static async uploadFile(file: File, path: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('product-media')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    const { data: urlData } = supabase.storage
      .from('product-media')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  }

  static async uploadMultipleFiles(files: File[], path: string): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, path));
    return Promise.all(uploadPromises);
  }

  static async deleteFile(url: string): Promise<void> {
    // Extract file path from URL
    const urlParts = url.split('/');
    const bucketIndex = urlParts.findIndex(part => part === 'product-media');
    if (bucketIndex === -1) return;
    
    const filePath = urlParts.slice(bucketIndex + 1).join('/');
    
    const { error } = await supabase.storage
      .from('product-media')
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }
}
