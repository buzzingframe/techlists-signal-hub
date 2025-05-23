
import { supabase } from "@/integrations/supabase/client";

export interface ProductSubmission {
  name: string;
  website: string;
  category: string;
  description: string;
  useCase: string;
  price: "Free" | "$" | "$$" | "Freemium";
  email: string;
}

export const submissionService = {
  async submitProduct(submission: ProductSubmission) {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("You must be logged in to submit a product");
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
        signal_score: 0, // Default score for new submissions
        badges: ['new'], // Mark as new submission
        logo: '📦', // Default logo
        editorial_summary: `New submission: ${submission.description}`,
        email: submission.email, // Store the submitter's email
        status: 'pending' // Mark submission as pending
      })
      .select()
      .single();

    if (error) {
      console.error('Error submitting product:', error);
      throw error;
    }

    return data;
  }
};
