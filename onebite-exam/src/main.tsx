import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 개발 환경에서는 0으로 설정합니다.
      // 모든 캐시 데이터를 서버로부터 불러와지자마자 stale 상태로 전환
      // 사용자가 페이지에 새롭게 방문할 때마다 항상 리페칭되도록 하는 게 일반적
      staleTime: 0,
      // 보통 5분 설정
      // staleTime보다 더 길게 설정
      gcTime: 5 * 60 * 1000,

      // 채팅, 주식차트 같은 실시간성이 강한 서비스를 제외하고는 Mount 시점만 true
      retryOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);
