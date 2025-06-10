
import { useQuery } from "@tanstack/react-query";
import { curatedListService } from "@/services/curatedListService";
import { productService } from "@/services/productService";
import { useIsAdmin } from "@/hooks/useAuth";

export function useRealCuratedLists() {
  const { data: lists = [], isLoading, error } = useQuery({
    queryKey: ['curated-lists'],
    queryFn: curatedListService.getAllLists,
  });

  const { isAdmin } = useIsAdmin();

  return { lists, isLoading, error, isAdmin };
}

export function useRealCuratedListDetail(listId: string) {
  const { data: list, isLoading: listLoading } = useQuery({
    queryKey: ['curated-list', listId],
    queryFn: () => curatedListService.getListById(listId),
    enabled: !!listId,
  });

  const { data: productIds = [], isLoading: productIdsLoading } = useQuery({
    queryKey: ['curated-list-products', listId],
    queryFn: () => curatedListService.getListProducts(listId),
    enabled: !!listId,
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products', 'by-ids', productIds],
    queryFn: () => productService.getProductsByIds(productIds),
    enabled: productIds.length > 0,
  });

  const isLoading = listLoading || productIdsLoading || productsLoading;
  const { isAdmin } = useIsAdmin();

  return { 
    list: list ? { ...list, productIds } : null, 
    products, 
    isLoading, 
    isAdmin 
  };
}
