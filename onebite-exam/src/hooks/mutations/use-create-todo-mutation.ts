import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@/api/create-todo";
import { useTodosData } from "../queries/use-todos-data";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: (newTodo) => {
      // window.location.reload(); // 안 좋은 방법

      // 좋은 방법
      // "todos" 키를 가진 캐시 데이터를 무효화
      // queryClient.invalidateQueries({
      //   queryKey: QUERY_KEYS.todo.list,
      // });

      // 최적화 방법
      // queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodo) => {
      //   if (!prevTodo) return [newTodo];
      //   return [...prevTodo, newTodo];
      // });

      // 캐시 정규화 (개선)
      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(newTodo.id),
        newTodo,
      );
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [newTodo.id];
          return [...prevTodoIds, newTodo.id];
        },
      );
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
