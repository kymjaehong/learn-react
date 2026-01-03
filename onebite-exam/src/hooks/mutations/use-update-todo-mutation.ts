import { updateTodo } from "@/api/update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      // 해당 queryKey로 캐시 데이터를 불러오는 조회 요청이 있다면 전부 취소 처리합니다.
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.list,
      });

      // 요청 실패를 고려해서 캐시 데이터(원본)를 변수에 담아 리턴합니다.
      const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);

      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) =>
          prevTodo.id === updatedTodo.id
            ? { ...prevTodo, ...updatedTodo }
            : prevTodo,
        );
      });

      return {
        prevTodos,
      };
    },
    onError: (error, variable, context) => {
      if (context && context.prevTodos) {
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}
