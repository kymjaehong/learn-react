import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

const useProfileEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    })),
    { name: "ProfileEditorModalStore" },
  ),
);

// store 중 open만
export const useOpenProfileEditorModal = () => {
  const open = useProfileEditorModalStore((store) => store.actions.open);
  return open;
};

// store 전체
export const useProfileEditorModal = () => {
  const store = useProfileEditorModalStore();
  return store;
};
