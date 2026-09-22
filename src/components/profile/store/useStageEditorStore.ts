import { create } from "zustand";

import {
  type BuildingBox,
  DAANGN_COLLIDERS,
  DAANGN_SPAWN,
  type SpawnPoint,
} from "@/components/profile/constants/daangnStage";

/** 기즈모가 잡고 있는 대상. 숫자면 그 번째 구역이다. */
export type StageTarget = "spawn" | number;

/** 새 구역은 원점에 사람 키만 한 상자로 나온다. 자리는 끌어서 잡는다. */
const NEW_BOX: BuildingBox = { position: [0, 2, 0], size: [4, 4, 4] };

type StageEditorStore = {
  boxes: BuildingBox[];
  spawn: SpawnPoint;
  target: StageTarget;
  patchBox: (index: number, next: Partial<BuildingBox>) => void;
  patchSpawn: (next: Partial<SpawnPoint>) => void;
  addBox: () => void;
  removeBox: (index: number) => void;
  select: (target: StageTarget) => void;
  reset: () => void;
};

/** 당근이네 배치 편집기가 만지는 값. 개발용. */
export const useStageEditorStore = create<StageEditorStore>((set) => ({
  boxes: DAANGN_COLLIDERS,
  spawn: DAANGN_SPAWN,
  target: "spawn",

  patchBox: (index, next) =>
    set((state) => ({
      boxes: state.boxes.map((box, i) =>
        i === index ? { ...box, ...next } : box
      ),
    })),

  patchSpawn: (next) =>
    set((state) => ({ spawn: { ...state.spawn, ...next } })),

  // 새로 만든 칸을 바로 잡게 해 준다. 추가만 하고 고르지 않으면
  // 원점에 겹쳐 놓인 상자를 눈으로 찾아야 한다.
  addBox: () =>
    set((state) => ({
      boxes: [...state.boxes, NEW_BOX],
      target: state.boxes.length,
    })),

  removeBox: (index) =>
    set((state) => {
      const boxes = state.boxes.filter((_, i) => i !== index);
      // 지운 칸을 계속 짚고 있으면 없는 대상에 손잡이가 달린다.
      const target =
        state.target === index
          ? "spawn"
          : typeof state.target === "number" && state.target > index
            ? state.target - 1
            : state.target;
      return { boxes, target };
    }),

  select: (target) => set({ target }),
  reset: () => set({ boxes: DAANGN_COLLIDERS, spawn: DAANGN_SPAWN }),
}));
