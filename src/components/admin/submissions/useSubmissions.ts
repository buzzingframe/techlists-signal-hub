
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Submission } from "./types";

export function useSubmissions() {
  return useQuery({
    queryKey: ['product-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching product submissions:", error);
        throw error;
      }

      // Transform the data into the format our component expects
      return data.map(product => ({
        id: product.id,
        name: product.name,
        submitter: product.email || 'Unknown',
        status: product.status || 'pending',
        submittedAt: product.created_at,
        category: product.category,
        description: product.description
      })) as Submission[];
    }
  });
}
