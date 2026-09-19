import { create } from "zustand";

import type { MotionName } from "@/components/profile/webgl/character/MotionCharacter";

type MotionStore = {
  motion: MotionName;
  play: (motion: MotionName) => void;
  /** 한 번만 재생하는 클립이 끝났을 때 되돌아갈 곳. */
  rest: () => void;
};

/**
 * 캐릭터가 지금 하는 동작.
 *
 * 버튼은 캔버스 밖 DOM, 캐릭터는 캔버스 안이라 둘을 잇는 지점이 필요하다.
 * 진입하면 idle 로 시작한다.
 */
export const useMotionStore = create<MotionStore>((set) => ({
  motion: "idle",
  play: (motion) => set({ motion }),
  rest: () => set({ motion: "idle" }),
}));
