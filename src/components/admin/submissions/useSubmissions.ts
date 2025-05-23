
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Submission } from "./types";
import { useEffect } from "react";

export function useSubmissions() {
  const query = useQuery({
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
    },
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Always refetch when component mounts
  });

  // Set up real-time subscription for products table changes
  useEffect(() => {
    const channel = supabase
      .channel('admin-submissions-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products'
        },
        () => {
          // Invalidate and refetch when any change occurs in products table
          query.refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [query]);

  return query;
}
