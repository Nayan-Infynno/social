import { postsAPI } from "@/src/config/api/post/post.api";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const queryClient = useQueryClient();

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
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-posts"],
      }),
  });
}

export function useUpdatePost() {
  return useMutation({
    mutationKey: ["update-post"],
    mutationFn: postsAPI.updatePost,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["get-posts"],
      }),
  });
}
