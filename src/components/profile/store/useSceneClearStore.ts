import { create } from "zustand";
import { persist } from "zustand/middleware";

type SceneClearStore = {
  /** 씬 id → 클리어 여부. */
  cleared: Record<string, boolean>;
  clear: (sceneId: string) => void;
  /** 같은 동작을 다시 하면 되돌린다. */
  toggle: (sceneId: string) => void;
  /** 연출을 다시 보고 싶을 때. 개발용. */
  reset: () => void;
};

/**
 * 씬을 클리어했는지. 로컬 저장소에 남는다.
 *
 * 코인처럼 쌓이는 값이 아니라 켜졌나 꺼졌나 하는 표시다. 클리어한 씬은
 * 배경이 바뀐 채로 열린다. 같은 동작을 다시 하면 되돌아간다.
 */
export const useSceneClearStore = create<SceneClearStore>()(
  persist(
    (set) => ({
      cleared: {},

      clear: (sceneId) =>
        set((state) =>
          // 이미 클리어면 그대로 둔다. 새 객체를 만들면 구독자가 공연히 다시 그린다.
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
