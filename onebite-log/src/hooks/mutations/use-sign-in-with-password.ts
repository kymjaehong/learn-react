import { signInWithPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithPassword(callbacks?: {
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);

      // 비즈니스 로직 혹은 캐시 데이터 처리 등
    },
  });
}
