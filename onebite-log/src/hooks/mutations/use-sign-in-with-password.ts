import { signInWithPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSignInWithPassword(callbacks?: {
  onError: (error: Error) => void;
}) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      // window.alert(error);
      toast.error(error.message, {
        position: "top-center",
      });

      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
