import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ceramicAPI } from "../config/api/ceramic.api";

export function useGetCategories(params: any) {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: () => ceramicAPI.getCategories(params),
  });
}

export function useSubCategories(categoryId: number | null) {
  return useInfiniteQuery({
    queryKey: ["subCategories", categoryId],
    enabled: !!categoryId,

    queryFn: ({ pageParam = 1 }) =>
      ceramicAPI.getCategories({
        CategoryId: categoryId,
        PageIndex: pageParam,
      }),

    getNextPageParam: (lastPage, allPages) => {
      const subCats = lastPage?.Result?.Category?.[0]?.SubCategories ?? [];

      return subCats.length > 0 ? allPages.length + 1 : undefined;
    },

    initialPageParam: 1,
  });
}

export const useProductsBySubCategory = (subCategoryId: number) => {
  return useInfiniteQuery({
    queryKey: ["products", subCategoryId],
    enabled: !!subCategoryId,
    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      ceramicAPI.getProducts({
        SubCategoryId: subCategoryId,
        PageIndex: pageParam,
      }),

    getNextPageParam: (lastPage, pages) => {
      const products = lastPage?.Result?.Product ?? [];
      return products.length > 0 ? pages.length + 1 : undefined;
    },
  });
};

export function useProducts(subCategoryId: number) {
  return useInfiniteQuery({
    queryKey: ["products", subCategoryId],
    enabled: !!subCategoryId,

    queryFn: ({ pageParam = 1 }) =>
      ceramicAPI.getProducts({
        SubCategoryId: subCategoryId,
        PageIndex: pageParam,
      }),

    getNextPageParam: (lastPage, allPages) =>
      lastPage?.Result?.length > 0 ? allPages.length + 1 : undefined,

    initialPageParam: 1,
  });
}
