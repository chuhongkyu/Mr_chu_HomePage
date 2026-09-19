import { create } from "zustand";
import { persist } from "zustand/middleware";

type SceneClearStore = {
  cleared: Record<string, boolean>;
  clear: (sceneId: string) => void;
  toggle: (sceneId: string) => void;
  reset: () => void;
};

/** 씬별 클리어 표시. 로컬 저장소에 남아 다시 들어와도 유지된다. */
export const useSceneClearStore = create<SceneClearStore>()(
  persist(
    (set) => ({
      cleared: {},

      clear: (sceneId) =>
        set((state) =>
          // 새 객체를 만들면 구독자가 공연히 다시 그린다.
          state.cleared[sceneId]
            ? state
            : { cleared: { ...state.cleared, [sceneId]: true } }
        ),

      toggle: (sceneId) =>
        set((state) => ({
          cleared: { ...state.cleared, [sceneId]: !state.cleared[sceneId] },
        })),

      reset: () => set({ cleared: {} }),
    }),
    { name: "scene-clear" }
  )
);
