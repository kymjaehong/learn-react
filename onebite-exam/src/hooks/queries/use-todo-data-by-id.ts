import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { useQuery } from "@tanstack/react-query";

export function useTodoDataById(id: number) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: ["todos", id],

    staleTime: 5000, // 5000ms동안 fresh 유지
    gcTime: 5000, // 5000ms 이후 캐시 데이터 삭제

    // refetchInterval: 1000, // 1000ms마다 api 호출
  });
}
