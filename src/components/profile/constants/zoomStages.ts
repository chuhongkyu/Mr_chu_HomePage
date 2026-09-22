import {
  DAANGN_SPAWN,
  SPAWN_VIEW_TARGET,
} from "@/components/profile/constants/daangnStage";
import { CAMERA } from "@/components/profile/constants/sceneConfig";

/**
 * 줌 하나로 이어지는 단계들.
 *
 * 담는 세로(`viewHeight`)가 곧 상태다. 작을수록 확대다. 씬을 따로 전환하지
 * 않고, 그림·핫스팟·캐릭터가 저마다 자기 구간에서 나타났다 사라진다.
 *
 * 축 밖 씬(현대미술)은 여기 없다. 내비로 그냥 바뀐다.
 *
 * 도시 전경 단계가 곧 온라인 강의다. 그 그림 앞에 유리 판이 뜬다.
 */
export type ZoomStage = {
  /** `PROJECTS` 의 id. 씬이 아닌 단계는 null 이라 내비에 안 잡힌다. */
  project: string | null;
  viewHeight: number;
  /** 이 단계에서 카메라가 볼 지점. */
  target: readonly [number, number, number];
};

export const ZOOM_STAGES: readonly ZoomStage[] = [
  // 더 당길수록 캐릭터가 커지지만 근경 그림이 그만큼 늘어난다. 배수는
  // 22(근경의 월드 세로)를 이 값으로 나눈 것이다. 16 이면 1.375 배 —
  // 소스 657px 중 478px 이 화면 세로를 채운다.
  //
  // 이 값은 줌축 전체의 최대 확대이기도 하다(`MIN_VIEW_HEIGHT`).
  // 내릴수록 스냅이 되돌리는 구간도 같이 넓어져서 휠이 안 먹는 느낌이 난다.
  { project: "genaimo", viewHeight: 16, target: SPAWN_VIEW_TARGET },
  { project: "daangn", viewHeight: 22, target: CAMERA.target },
  { project: "fastcampus", viewHeight: 60, target: CAMERA.target },
];

/** 줌축에서의 휠 감도. OrbitControls 는 한 번에 `0.95 ^ zoomSpeed` 배 한다. */
export const AXIS_ZOOM_SPEED = 0.5;

/** 온라인 강의(도시 전경) 단계의 담는 세로. 판 배치가 이 값을 기준으로 펴진다. */
export const CITY_VIEW_HEIGHT =
  ZOOM_STAGES.find((stage) => stage.project === "fastcampus")?.viewHeight ?? 60;

/**
 * 단계와 단계가 겹치는 폭.
 *
 * 넓으면 중간 상태가 오래 보인다. 캐릭터는 덜 자랐는데 그림은 반쯤 걷힌,
 * 어느 단계도 아닌 화면이 계속 눈에 밟힌다. 좁게 잡아 각 단계를 또렷하게
 * 두고 경계에서만 잠깐 걸치게 한다.
 */
const BLEND = 4;

/** 두 단계 사이에서 갈아 끼워지는 담는 세로 구간. 가운데에서 짧게 겹친다. */
const blendBand = (a: number, b: number): [number, number] => {
  const mid = (a + b) / 2;
  return [mid - BLEND / 2, mid + BLEND / 2];
};

/** 젠아이모 ↔ 당근이네. 이 구간에서 캐릭터가 자라고 줄어든다. */
export const GENAIMO_BAND = blendBand(
  ZOOM_STAGES[0].viewHeight,
  ZOOM_STAGES[1].viewHeight
);

/** 당근이네 ↔ 온라인 강의. 판이 서는 자리를 정한다. */
export const CITY_BAND = blendBand(
  ZOOM_STAGES[1].viewHeight,
  ZOOM_STAGES[2].viewHeight
);

/**
 * 근경이 도시 전경으로 갈아 끼워지는 구간.
 *
 * 단계 중간이 아니라 **그림 크기**가 정한다. 근경은 월드 세로가 22 라
 * 담는 세로가 그보다 커지는 순간부터 화면을 못 덮고 여백이 드러난다.
 * 단계 중간(39)까지 끌면 그림이 화면의 56% 로 쪼그라든 채 버티게 된다.
 *
 * 구역 점도 이 구간을 따른다. 그림이 걷혔는데 점만 떠 있으면 안 된다.
 */
export const IMAGE_SWAP_BAND: [number, number] = [28, 36];

export const MIN_VIEW_HEIGHT = ZOOM_STAGES[0].viewHeight;
export const MAX_VIEW_HEIGHT = ZOOM_STAGES[ZOOM_STAGES.length - 1].viewHeight;

/** 당근이네 기본. 줌축의 출발점이다. */
export const BASE_VIEW_HEIGHT =
  ZOOM_STAGES.find((stage) => stage.project === "daangn")?.viewHeight ??
  CAMERA.orthoViewHeight;

export const stageFor = (project: string) =>
  ZOOM_STAGES.find((stage) => stage.project === project);

/**
 * 이 줌에서 내비가 짚어야 할 프로젝트.
 *
 * 가장 가까운 단계를 고른다. 도시 풍경처럼 씬이 없는 단계에서는 바로 앞의
 * 씬을 그대로 짚는다. 내비에서 짚을 곳이 사라지면 화면이 빈 것처럼 보인다.
 */
export const nearestStage = (viewHeight: number) => {
  let nearest = ZOOM_STAGES[0];
  let best = Infinity;
  ZOOM_STAGES.forEach((stage) => {
    const gap = Math.abs(stage.viewHeight - viewHeight);
    if (gap < best) {
      best = gap;
      nearest = stage;
    }
  });
  return nearest;
};

/**
 * 휠을 놓고 이만큼(초) 지나면 가까운 단계로 붙는다.
 *
 * 휠은 비율로 움직여서 담는 세로를 아무리 벌려도 한 단계에 필요한 횟수는
 * 그대로다(당근이네 구간은 어느 쪽이든 여덟 번). 트랙패드는 한 번 쓸면
 * 그만큼 쏟아지므로, 손으로 멈춰 세우는 건 사실상 불가능하다. 그래서
 * 멈추면 붙여 준다.
 */
export const SNAP_DELAY = 0.18;

export const projectAt = (viewHeight: number) => {
  let nearest = 0;
  let best = Infinity;
  ZOOM_STAGES.forEach((stage, index) => {
    const gap = Math.abs(stage.viewHeight - viewHeight);
    if (gap < best) {
      best = gap;
      nearest = index;
    }
  });
  for (let i = nearest; i >= 0; i -= 1) {
    if (ZOOM_STAGES[i].project) return ZOOM_STAGES[i].project;
  }
  return ZOOM_STAGES.find((stage) => stage.project)?.project ?? null;
};

const clamp = (x: number, lo: number, hi: number) =>
  Math.min(Math.max(x, lo), hi);

/** 0~1 로 자른 뒤 양 끝을 눕힌다. */
export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * 담는 세로에 맞는 카메라 지점. 단계 사이는 선형으로 잇는다.
 *
 * 젠아이모 쪽으로 당길수록 캐릭터가 선 자리로, 당근이네 쪽으로 풀수록
 * 그림 한가운데로 옮겨 간다.
 */
export const targetFor = (
  viewHeight: number,
  out: [number, number, number]
): [number, number, number] => {
  const first = ZOOM_STAGES[0];
  const last = ZOOM_STAGES[ZOOM_STAGES.length - 1];

  if (viewHeight <= first.viewHeight) {
    out[0] = first.target[0];
    out[1] = first.target[1];
    out[2] = first.target[2];
    return out;
  }
  if (viewHeight >= last.viewHeight) {
    out[0] = last.target[0];
    out[1] = last.target[1];
    out[2] = last.target[2];
    return out;
  }

  for (let i = 0; i < ZOOM_STAGES.length - 1; i += 1) {
    const a = ZOOM_STAGES[i];
    const b = ZOOM_STAGES[i + 1];
    if (viewHeight > b.viewHeight) continue;

    // 선형으로 이으면 조금만 굴려도 시선이 곧장 미끄러진다. 단계 가까이서는
    // 붙들고 있다가 겹침 구간에서 옮겨야 각 단계가 제자리로 읽힌다.
    const [lo, hi] = blendBand(a.viewHeight, b.viewHeight);
    const t = smoothstep(lo, hi, viewHeight);
    out[0] = a.target[0] + (b.target[0] - a.target[0]) * t;
    out[1] = a.target[1] + (b.target[1] - a.target[1]) * t;
    out[2] = a.target[2] + (b.target[2] - a.target[2]) * t;
    return out;
  }
  return out;
};

/**
 * 젠아이모 월드를 당근이네 그림에 맞추는 배수.
 *
 * 그대로 두면 캐릭터 키가 11.57 이라 담는 세로 12 짜리 화면을 통째로 먹는다.
 * 스폰 편집기에서 그림에 맞춰 잡은 값이 그 배수다.
 */
export const GENAIMO_WORLD_SCALE = DAANGN_SPAWN.scale;
