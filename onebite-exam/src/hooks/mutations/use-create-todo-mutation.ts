import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@/api/create-todo";
import { useTodosData } from "../queries/use-todos-data";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: () => {
      //   window.location.reload(); // 안 좋은 방법

      // 좋은 방법
      // "todos" 키를 가진 캐시 데이터를 무효화
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
