import PostEditorModal from "@/components/modal/post-editor-modal";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {/* 
        전체화면 맨 위에 떠 있어야 하기 때문에 
        createPortal를 통해 컴포넌트의 계층 구조에서 벗어나 
        특정 DOM 요소 아래에 바로 랜더링 될 수 있도록 합니다.
      */}
      {createPortal(
        <PostEditorModal />,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
