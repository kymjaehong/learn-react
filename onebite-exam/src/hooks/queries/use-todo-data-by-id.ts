import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export function useTodoDataById(id: string, type: "LIST" | "DETAIL") {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: QUERY_KEYS.todo.detail(id),
    // 해당 경우에만 refetching
    // 다른 경우에는 캐시 데이터가 disabled로 설정됨.
    enabled: type === "DETAIL",

    // staleTime: 5000, // 5000ms동안 fresh 유지
    // gcTime: 5000, // 5000ms 이후 캐시 데이터 삭제

    // refetchInterval: 1000, // 1000ms마다 api 호출
  });
}
