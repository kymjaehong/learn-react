import { fetchTodos } from "@/api/fetch-todos";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTodosData() {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: async () => {
      // 리턴 값을 캐시 데이터로 저장하기 때문에 id 값만 저장합니다.
      const todos = await fetchTodos();

      // 개별 캐시 데이터로 저장
      todos.forEach((todo) => {
        queryClient.setQueryData<Todo>(QUERY_KEYS.todo.detail(todo.id), todo);
      });

      return todos.map((todo) => todo.id);
    },
    queryKey: QUERY_KEYS.todo.list,
    // retry: 0,
  });
}
