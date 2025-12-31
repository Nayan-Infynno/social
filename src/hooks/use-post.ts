import { postsAPI } from "@/src/config/api/posts.api";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export function useAllPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: postsAPI.getPosts,
  });
}

export function usePostPaginated() {
  return useInfiniteQuery({
    queryKey: ["get-posts"],
    queryFn: postsAPI.getPostsPaginated,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

export function useCreatePost() {
  return useMutation({
    mutationKey: ["create-post"],
    mutationFn: postsAPI.createPost,
  });
}

export function useUpdatePost() {
  return useMutation({
    mutationKey: ["update-post"],
    mutationFn: postsAPI.updatePost,
  });
}
