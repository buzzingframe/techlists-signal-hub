
-- Add foreign key constraints to curated_lists table
ALTER TABLE public.curated_lists 
ADD CONSTRAINT fk_curated_lists_created_by 
FOREIGN KEY (created_by) REFERENCES public.profiles(id) ON DELETE SET NULL;

-- Add foreign key constraints to curated_list_products table
ALTER TABLE public.curated_list_products 
ADD CONSTRAINT fk_curated_list_products_list_id 
FOREIGN KEY (list_id) REFERENCES public.curated_lists(id) ON DELETE CASCADE;

ALTER TABLE public.curated_list_products 
ADD CONSTRAINT fk_curated_list_products_product_id 
FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

-- Add foreign key constraints to reviews table
ALTER TABLE public.reviews 
ADD CONSTRAINT fk_reviews_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE SET NULL;

ALTER TABLE public.reviews 
ADD CONSTRAINT fk_reviews_product_id 
FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

-- Add foreign key constraints to saved_products table
ALTER TABLE public.saved_products 
ADD CONSTRAINT fk_saved_products_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.saved_products 
ADD CONSTRAINT fk_saved_products_product_id 
FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

-- Add foreign key constraints to user_preferences table
ALTER TABLE public.user_preferences 
ADD CONSTRAINT fk_user_preferences_user_id 
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Enable Row Level Security on curated_lists and curated_list_products
ALTER TABLE public.curated_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curated_list_products ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for curated_lists (allow everyone to read)
CREATE POLICY "Anyone can view curated lists" 
ON public.curated_lists 
FOR SELECT 
USING (true);

-- Create RLS policies for curated_list_products (allow everyone to read)
CREATE POLICY "Anyone can view curated list products" 
ON public.curated_list_products 
FOR SELECT 
USING (true);

-- Create policies for authenticated users to manage lists
CREATE POLICY "Authenticated users can create curated lists" 
ON public.curated_lists 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own curated lists" 
ON public.curated_lists 
FOR UPDATE 
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own curated lists" 
ON public.curated_lists 
FOR DELETE 
TO authenticated
USING (auth.uid() = created_by);

-- Create policies for managing curated list products
CREATE POLICY "Authenticated users can add products to lists they own" 
ON public.curated_list_products 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.curated_lists 
    WHERE id = list_id AND created_by = auth.uid()
  )
);

CREATE POLICY "Users can update products in their own lists" 
ON public.curated_list_products 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.curated_lists 
    WHERE id = list_id AND created_by = auth.uid()
  )
);

CREATE POLICY "Users can remove products from their own lists" 
ON public.curated_list_products 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.curated_lists 
    WHERE id = list_id AND created_by = auth.uid()
  )
);
