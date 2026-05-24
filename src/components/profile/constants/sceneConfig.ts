import { GRID_CENTER } from "@/components/profile/object/InventoryGridEngine";

const [cx, , cz] = GRID_CENTER;

// 카메라 → target 오프셋 (X, Y, Z)
const CAM_OFFSET_X = 9;
const CAM_OFFSET_Z = 9;

export const CAMERA = {
  fov: 40,
  near: 0.1,
  far: 200,

  position: [cx + CAM_OFFSET_X, 9, cz + CAM_OFFSET_Z] as [number, number, number],
  target: [cx, 1, cz] as [number, number, number],

  // atan2(offsetX, offsetZ) — OrbitControls 초기화 타이밍 없이 미리 계산
  initialAzimuth: Math.atan2(CAM_OFFSET_X, CAM_OFFSET_Z),

  minDistance: 10,
  maxDistance: 25,
  minPolarAngle: Math.PI * 0.1,
  maxPolarAngle: Math.PI * 0.48,

  azimuthLerpFactor: 0.12,
} as const;

export const SCENE = {
  playerCenterY: 1,
} as const;
