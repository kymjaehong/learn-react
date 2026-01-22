import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 5;

export function useInfinitePostsData() {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const posts = await fetchPosts({ from, to });
      // [domain, byId, ${id}] 별로 캐시 저장을 하고
      // [domain, list]에는 id 리스트를 저장한다.
      posts.forEach((post) => {
        queryClient.setQueryData(QUERY_KEYS.post.byId(post.id), post);
      });
      return posts.map((post) => post.id);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },

    // [Default]
    // staleTime: 0,
    // gcTime: 5 * 60 * 1000,

    // [성능 이슈]
    // staleTime이 0일 때, 무한스크롤로 가져온 모든 데이터를 리페칭할 때 부하가 발생합니다

    // [해결]
    // 무한스크롤로 가져온 데이터는 자동 리페칭을 금지한다
    staleTime: Infinity,

    // 추가, 수정, 삭제된 최신 반영 데이터로 업데이트하기 (적절한 캐시 변형, 조작)
    // mutations onSuccess()에 구현
  });
}
