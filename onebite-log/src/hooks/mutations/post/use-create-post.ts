import { createPostWithImages } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { useMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 1. [권장] 캐시 아예 초기화
      // invalidateQueries는 캐시된 데이터를 모두 리페칭하기 때문에 부하가 발생할 수 있습니다
      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });

      // 2. 캐시 데이터에 완성된 포스트만 추가

      // 3. 낙관적 업데이트 방식 - onMutate
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
