import { create } from "zustand";
import { persist } from "zustand/middleware";

type PostViewStore = {
  viewed: Record<string, boolean>; // postId -> 5초 이상 봤는지
  markViewed: (id: string) => void;
  viewedCount: () => number;
};

export const usePostViewStore = create<PostViewStore>()(
  persist(
    (set, get) => ({
      viewed: {},

      markViewed: (id) =>
        set((s) => ({ viewed: { ...s.viewed, [id]: true } })),

      viewedCount: () =>
        Object.values(get().viewed).filter(Boolean).length,
    }),
    { name: "post-view" }
  )
);
