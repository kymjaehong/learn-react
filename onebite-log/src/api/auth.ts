import supabase from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    // scope: "local" 지정하면, 로컬스토리지에 저장된 세션을 날립니다.
    // 외부 통신이 실패해도 브라우저 상에서는 로그아웃 처리됩니다.
    await supabase.auth.signOut({
      scope: "local",
    });
  }
}

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });

  if (error) throw error;
  return data;
}

export async function requestPasswordResetEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${import.meta.env.VITE_PUBLIC_URL}/reset-password`,
  });

  if (error) throw error;
  return data;
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;
  return data;
}
