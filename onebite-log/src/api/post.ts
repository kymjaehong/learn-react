import supabase from "@/lib/supabase";
import { uploadImage } from "./image";
import type { PostEntity } from "@/types";

// READ
export async function fetchPosts({
  from,
  to,
  userId,
}: {
  from: number;
  to: number;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*), myLiked: like!post_id (*)")
    .eq("like.user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data.map((post) => ({
    ...post,
    isLiked: post.myLiked && post.myLiked.length > 0,
  }));
}

export async function fetchPostById({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*), myLiked: like!post_id (*)")
    .eq("like.user_id", userId)
    .eq("id", postId)
    .single();

  if (error) throw error;
  return {
    ...data,
    isLiked: data.myLiked && data.myLiked.length > 0,
  };
}

// CUD
export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content,
    })
    .select()
    .single(); // 추가된 데이터를 반환

  if (error) throw error;
  return data;
}

export async function createPostWithImages({
  content,
  images,
  userId,
}: {
  content: string;
  images: File[];
  userId: string;
}) {
  // 1. 새로운 포스트 생성
  const post = await createPost(content);
  if (images.length === 0) return post;

  try {
    // 2. 이미지 업로드 (병렬 실행)
    const imageUrls = await Promise.all(
      images.map((image) => {
        const fileExtension = image.name.split(".").pop() || "webp";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `${userId}/${post.id}/${fileName}`;

        return uploadImage({
          file: image,
          filePath,
        });
      }),
    );

    // 3-1. 포스트 테이블 업데이트
    const updatedPost = await updatePost({
      id: post.id,
      image_urls: imageUrls,
    });

    return updatedPost;
  } catch (error) {
    // 3-2. 이미지 업로드 실패시, 생성된 포스트 삭제
    await deletePost(post.id);
    throw error;
  }
}

export async function updatePost(post: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: number) {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// RPC
export async function togglePostLike({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) {
  const { data, error } = await supabase.rpc("toggle_post_like", {
    p_post_id: postId,
    p_user_id: userId,
  });

  if (error) throw error;
  return data;
}
