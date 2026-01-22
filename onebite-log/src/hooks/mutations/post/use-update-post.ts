import { updatePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { type Post, type useMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePost(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 업데이트된 데이터만 캐시 초기화
      queryClient.setQueryData<Post>(
        QUERY_KEYS.post.byId(updatedPost.id),
        (prevPost) => {
          if (!prevPost)
            throw new Error(
              `${updatedPost.id}에 해당하는 포스트를 캐시 데이터에서 찾을 수 없습니다.`,
            );

          return { ...prevPost, ...updatedPost };
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
