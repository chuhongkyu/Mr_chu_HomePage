import { create } from "zustand";

import { CAMERA } from "@/components/profile/constants/sceneConfig";

export const ZOOM_MIN = CAMERA.zoomOutRatio;
export const ZOOM_MAX = CAMERA.zoomInRatio;

/** 이보다 작은 차이는 같은 값으로 본다. 없으면 둘이 서로를 밀며 떨린다. */
export const ZOOM_EPSILON = 0.001;

type ZoomStore = {
  /** 기준 zoom 대비 배율. `ZOOM_MIN`~`ZOOM_MAX`. */
  ratio: number;
  /** 마지막으로 값을 바꾼 쪽. 카메라가 누구를 따라갈지 정한다. */
  source: "slider" | "camera";
  /** 슬라이더가 움직였다. 카메라가 따라간다. */
  request: (ratio: number) => void;
  /** 휠·핀치로 카메라가 움직였다. 슬라이더만 맞춘다. */
  report: (ratio: number) => void;
};

const clamp = (value: number) => Math.min(Math.max(value, ZOOM_MIN), ZOOM_MAX);

/**
 * 지도 확대처럼 쓰는 줌.
 *
 * 슬라이더는 캔버스 밖 DOM, 카메라는 캔버스 안이라 둘을 잇는 지점이 필요하다.
 */
export const useZoomStore = create<ZoomStore>((set) => ({
  ratio: ZOOM_MAX,
  source: "camera",
  request: (ratio) => set({ ratio: clamp(ratio), source: "slider" }),
  report: (ratio) => set({ ratio: clamp(ratio), source: "camera" }),
}));
