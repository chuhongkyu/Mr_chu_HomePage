import { GRID_CENTER } from "@/components/profile/webgl/object/InventoryGridEngine";

const [cx, , cz] = GRID_CENTER;

// 카메라 → target 오프셋 (X, Y, Z) — 원근 모드 전용
// 씨앗 낙하 파티클이 원본 값(scale 4, travel 10)이라 화면을 크게 먹는다.
// 그만큼 카메라를 뒤로 뺐다. 거리 16.5 → 22.9.
const CAM_OFFSET_X = 14;
const CAM_OFFSET_Z = 14;

const TARGET: [number, number, number] = [cx, 1.5, cz];

/** 원근 모드의 시작 거리. 확대를 막는 하한으로도 쓴다. */
const PERSPECTIVE_DISTANCE = Math.hypot(
  CAM_OFFSET_X,
  13 - TARGET[1],
  CAM_OFFSET_Z
);

// ── 아이소메트릭 ────────────────────────────────────────────
// 정등각(true isometric)은 카메라 방향 벡터가 (1,1,1)/√3 인 각도다.
//   방위각 45°, 지평선 위 35.2644°
/** 방위각. 씬의 판을 카메라와 마주 보게 돌릴 때도 쓴다. */
export const ISO_AZIMUTH = Math.PI / 4;

/**
 * 기본 앙각(도). 지평선 위로 이만큼 올라가서 내려다본다.
 *
 * 정등각(true isometric)은 35.2644° 지만 그보다 조금 더 위에서 본다.
 * 씬이 `elevation` 으로 따로 정하지 않았을 때 쓰는 값이다.
 */
export const DEFAULT_ELEVATION = 34;

// 직교 카메라는 거리가 크기와 무관하다. 클리핑 여유만 보고 넉넉히 둔다.
const ISO_DISTANCE = 60;

/** 젠아이모만 기본보다 조금 더 위에서 본다. 화면축을 쓰는 값이 이 각에 묶인다. */
export const GENAIMO_ELEVATION = 37;

/** 앙각(도) → OrbitControls 의 극각(라디안). 극각은 +Y 에서 잰다. */
export const elevationToPolar = (elevation: number) =>
  Math.PI / 2 - (elevation * Math.PI) / 180;

/**
 * 화면 기준으로 민 양을 월드 벡터로 바꾼다. `right` 는 화면 오른쪽,
 * `up` 은 화면 위쪽이 +다.
 *
 * 카메라 타겟에 더하면 화면이 그 방향으로 움직이므로, **보이는 것은 반대로
 * 밀린다.** `up: -1` 은 캐릭터 위 여백을 1 만큼 줄이고, `right: -1` 은
 * 캐릭터 왼쪽 여백을 1 만큼 늘린다.
 *
 * 앙각이 화면 위쪽이 어디인지를 정하므로 같은 각을 넘겨야 한다.
 */
export const screenShift = (
  right: number,
  up: number,
  elevation: number
): [number, number, number] => {
  const el = (elevation * Math.PI) / 180;
  const sinEl = Math.sin(el);
  const cosEl = Math.cos(el);
  const sinAz = Math.sin(ISO_AZIMUTH);
  const cosAz = Math.cos(ISO_AZIMUTH);
  return [
    right * cosAz - up * sinEl * sinAz,
    up * cosEl,
    -right * sinAz - up * sinEl * cosAz,
  ];
};

/**
 * 앙각에 맞는 카메라 위치. 방위각은 45° 로 고정한다.
 *
 * 직교에서는 거리가 크기와 무관해서 기본값(클리핑 여유)을 쓰면 되지만,
 * 원근에서는 거리가 곧 화각이라 담고 싶은 높이에서 역산해 넘겨야 한다.
 */
export const orbitPosition = (
  target: readonly [number, number, number],
  elevation: number,
  distance: number = ISO_DISTANCE
): [number, number, number] => {
  const polar = elevationToPolar(elevation);
  return [
    target[0] + Math.sin(polar) * Math.sin(ISO_AZIMUTH) * distance,
    target[1] + Math.cos(polar) * distance,
    target[2] + Math.sin(polar) * Math.cos(ISO_AZIMUTH) * distance,
  ];
};

/** 원근 카메라가 `viewHeight` 만큼 담으려면 떨어져야 하는 거리. */
export const perspectiveDistance = (viewHeight: number, fov: number) =>
  viewHeight / 2 / Math.tan(((fov / 2) * Math.PI) / 180);

export const CAMERA = {
  fov: 30,
  near: 0.1,
  far: 200,

  position: [cx + CAM_OFFSET_X, 15, cz + CAM_OFFSET_Z] as [
    number,
    number,
    number,
  ],
  target: TARGET,

  // atan2(offsetX, offsetZ) — OrbitControls 초기화 타이밍 없이 미리 계산
  // 오프셋이 X/Z 같은 값이라 ISO_AZIMUTH(45°)와 일치한다.
  initialAzimuth: Math.atan2(CAM_OFFSET_X, CAM_OFFSET_Z),

  // ── 원근(perspective) 전용 ─────────────────────────────
  // 확대 금지. 시작 거리보다 가까이 오지 못하게 막는다.
  minDistance: PERSPECTIVE_DISTANCE,
  maxDistance: 40,

  // ── 직교(orthographic) 전용 ────────────────────────────
  // zoom 을 고정값으로 두면 화면 크기마다 담기는 월드 양이 달라진다.
  //   화면에 담기는 세로 높이 = 캔버스 높이(px) / zoom
  // 그래서 담을 높이를 먼저 정하고 zoom 을 캔버스 높이에서 역산한다.
  // ↓ 화면이 답답하거나 허전하면 이 값 하나만 조절하면 된다.
  orthoViewHeight: 22,
  // 역산된 zoom 대비 배율. 화면 크기와 무관하게 같은 비율이 된다.
  // 직교에서는 zoom 이 클수록 확대다. zoomInRatio 가 1 이면 시작 상태가
  // 곧 최대 확대라서, 축소만 되고 확대는 막힌다.
  zoomOutRatio: 0.55,
  zoomInRatio: 1,

  // ── 팬(truck) 범위 ─────────────────────────────────────
  // 아이소메트릭은 회전 대신 팬으로 돌아다닌다.
  // 경계가 없으면 씬 밖 허공으로 빠져나가 아무것도 안 보이게 된다.
  panRangeXZ: 3.5,
  panRangeDown: 1.5,
  panRangeUp: 2.5,
  minPolarAngle: Math.PI * 0.1,
  maxPolarAngle: Math.PI * 0.48,

  azimuthLerpFactor: 0.12,
} as const;

export const SCENE = {
  playerCenterY: 1,
} as const;
