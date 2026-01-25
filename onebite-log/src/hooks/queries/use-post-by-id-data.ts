import { fetchPostById } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

export function usePostByIdData({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) {
  const session = useSession();

  return useQuery({
    queryKey: QUERY_KEYS.post.byId(postId),
    queryFn: () => fetchPostById({ postId, userId: session!.user.id }),
    enabled: type === "FEED" ? false : true,
    // queryFn을 사용하지 않고 캐시 데이터만 사용
    // 추후에 상세페이지나 데이터 리패칭이 필요할 때, true로 변경한다
    // type 매개변수를 통해 어떤 페이지에서 접근하냐에 따라 이를 분기한다
  });
}
