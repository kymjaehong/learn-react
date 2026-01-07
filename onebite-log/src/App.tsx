import RootRoute from "@/root-route";
import supabase from "@/lib/supabase";
import { useEffect } from "react";
import { useIsSessionLoaded, useSetSession } from "./store/session";

export default function App() {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  // 세션 데이터가 로딩 중일 때 화면 고정
  // 화면이 전환되거나 튕기는 이슈 방지
  if (!isSessionLoaded) return <div>로딩 중...</div>;

  return <RootRoute />;
}
