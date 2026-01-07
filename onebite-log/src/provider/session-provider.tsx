import GlobalLoader from "@/components/global-loader";
import supabase from "@/lib/supabase";
import { useIsSessionLoaded, useSetSession } from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  // 세션 데이터가 로딩 중일 때 화면 고정
  // 화면이 전환되거나 튕기는 이슈 방지
  if (!isSessionLoaded) return <GlobalLoader />;

  return children;
}
