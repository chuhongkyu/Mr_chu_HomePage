import { create } from "zustand";

import {
  type BuildingBox,
  DAANGN_BUILDING,
  DAANGN_SPAWN,
  type SpawnPoint,
} from "@/components/profile/constants/daangnStage";

/** 기즈모가 잡고 있는 대상. */
export type StageTarget = "building" | "spawn";

type StageEditorStore = {
  box: BuildingBox;
  spawn: SpawnPoint;
  target: StageTarget;
  patchBox: (next: Partial<BuildingBox>) => void;
  patchSpawn: (next: Partial<SpawnPoint>) => void;
  select: (target: StageTarget) => void;
  reset: () => void;
};

/** 당근이네 배치 편집기가 만지는 값. 개발용. */
export const useStageEditorStore = create<StageEditorStore>((set) => ({
  box: DAANGN_BUILDING,
  spawn: DAANGN_SPAWN,
  target: "spawn",

  patchBox: (next) => set((state) => ({ box: { ...state.box, ...next } })),
  patchSpawn: (next) =>
    set((state) => ({ spawn: { ...state.spawn, ...next } })),
  select: (target) => set({ target }),
  reset: () => set({ box: DAANGN_BUILDING, spawn: DAANGN_SPAWN }),
}));
