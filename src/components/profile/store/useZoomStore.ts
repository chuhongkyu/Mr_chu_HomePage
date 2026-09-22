import { create } from "zustand";

type ZoomStore = {
  /**
   * 지금 담고 있는 세로. 카메라가 매 프레임 알려준다.
   *
   * 슬라이더 손잡이가 이걸 따라간다. 리렌더를 피하려고 구독으로만 읽고
   * CSS 변수에 쓴다.
   */
  viewHeight: number;
  /** 부드럽게 옮겨 갈 목표. 내비 버튼과 스냅이 넣고, 카메라가 집어 간다. */
  request: number | null;
  /** 곧바로 옮길 목표. 슬라이더를 끄는 동안 넣는다. */
  jump: number | null;
  publish: (viewHeight: number) => void;
  goTo: (viewHeight: number) => void;
  dragTo: (viewHeight: number) => void;
  take: () => void;
  takeJump: () => void;
};

export const useZoomStore = create<ZoomStore>((set, get) => ({
  viewHeight: 0,
  request: null,
  jump: null,

  // 손잡이가 눈으로 따라올 만큼만 흘린다. 매 프레임 흘리면 구독자가 헛돈다.
  publish: (viewHeight) => {
    if (Math.abs(viewHeight - get().viewHeight) < 0.05) return;
    set({ viewHeight });
  },

  goTo: (viewHeight) => set({ request: viewHeight }),
  dragTo: (viewHeight) => set({ jump: viewHeight, request: null }),
  take: () => set({ request: null }),
  takeJump: () => set({ jump: null }),
}));
