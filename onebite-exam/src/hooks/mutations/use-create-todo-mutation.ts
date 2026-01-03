import { useMutation } from "@tanstack/react-query";
import { createTodo } from "@/api/create-todo";

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: () => {
      window.location.reload(); // 안 좋은 방법
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
