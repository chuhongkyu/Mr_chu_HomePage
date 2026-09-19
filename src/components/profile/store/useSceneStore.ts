import { create } from "zustand";

import { SCENES } from "@/components/profile/constants/scenes";

type SceneStore = {
  index: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
};

/**
 * 지금 보고 있는 씬.
 *
 * 헤더(이름)와 씬(배경·오브제)과 내비(화살표 활성화)가 이 하나를 본다.
 * 목록 끝에서는 더 가지 않는다. 순환시키면 "처음/끝" 감각이 사라진다.
 */
export const useSceneStore = create<SceneStore>((set) => ({
  index: 0,
  goTo: (index) =>
    set({ index: Math.min(Math.max(index, 0), SCENES.length - 1) }),
  next: () => set((s) => ({ index: Math.min(s.index + 1, SCENES.length - 1) })),
  prev: () => set((s) => ({ index: Math.max(s.index - 1, 0) })),
}));

/** 컴포넌트에서 매번 인덱스를 풀지 않도록. */
export const useCurrentScene = () => SCENES[useSceneStore((s) => s.index)];
