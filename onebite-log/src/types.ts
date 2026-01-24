import { type Database } from "./databse.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type LikeEntity = Database["public"]["Tables"]["like"]["Row"];

export type Post = PostEntity & { author: ProfileEntity };

export type useMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};
