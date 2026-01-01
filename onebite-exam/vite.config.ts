import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      // vite가 server 파일 아래의 모든 파일을 감지하지 않음
      // 해당 파일에 변화가 생겨도 리액트 앱이 리렌더링되지 않음
      ignored: ["**/server/**"],
    },
  },
});
