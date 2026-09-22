/**
 * 당근이네 그림이 3D 에서 차지하는 자리.
 *
 * 그림은 빌보드에 얹힌 2D 두 장이라 3D 부피가 없다. 그런데 다음 씬의 캐릭터는
 * 건물이 아닌 곳에서 걸어 나와야 한다. 그러려면 "여기는 건물"과 "여기서 나온다"
 * 두 가지가 월드 좌표로 필요하다.
 *
 * 카메라가 회전하지 않으므로(`enableRotate={false}`, 극각도 고정) 한 번 맞춰
 * 두면 그림과 계속 겹쳐 있다.
 *
 * 값은 `?mode=edit` 의 도구 모음에서 "당근이네 배치" 를 켜고 맞춘 뒤,
 * TS 복사로 여기에 붙여 넣는다.
 */
import {
  CAMERA,
  GENAIMO_ELEVATION,
  screenShift,
} from "@/components/profile/constants/sceneConfig";
import { STICKMAN_HEIGHT } from "@/components/profile/constants/stickman";

export type BuildingBox = {
  /** 카메라 타겟 기준. 바닥 중심이 아니라 부피의 중심이다. */
  position: [number, number, number];
  /** 가로 · 높이 · 세로. */
  size: [number, number, number];
};

export type SpawnPoint = {
  /** 카메라 타겟 기준. 모델 원점이 발밑이라 y 가 곧 땅 높이다. */
  position: [number, number, number];
  /** Genaimo 씬 크기를 1 로 본 배수. 두 씬은 월드 스케일이 다르다. */
  scale: number;
};

export const DAANGN_BUILDING: BuildingBox = {
  position: [1, 3, 0],
  size: [10, 12, 8],
};

export const DAANGN_SPAWN: SpawnPoint = {
  position: [5.54, 0, 10.21],
  scale: 0.14,
};

/**
 * 스폰 지점의 월드 좌표. 저장값이 카메라 타겟 기준이라 한 번 풀어 준다.
 * 모델 원점이 발밑이므로 이 점이 곧 캐릭터가 딛는 자리다.
 */
export const DAANGN_SPAWN_WORLD: [number, number, number] = [
  CAMERA.target[0] + DAANGN_SPAWN.position[0],
  CAMERA.target[1] + DAANGN_SPAWN.position[1],
  CAMERA.target[2] + DAANGN_SPAWN.position[2],
];

/** 그림에 맞춰 줄인 캐릭터의 실제 키. */
export const SPAWN_CHARACTER_HEIGHT = STICKMAN_HEIGHT * DAANGN_SPAWN.scale;

/**
 * 캐릭터 몸 중앙.
 *
 * 모델 원점이 발밑이라 발을 그대로 보면 몸이 화면 위쪽에 쏠린다. 키의
 * 절반만큼 올려서 몸 중앙을 가운데에 둔다. 키는 그림에 맞춰 줄인 쪽이다.
 * 원래 키로 재면 캐릭터 머리 위 한참을 보게 된다.
 */
const SPAWN_BODY_CENTER: [number, number, number] = [
  DAANGN_SPAWN_WORLD[0],
  DAANGN_SPAWN_WORLD[1] + SPAWN_CHARACTER_HEIGHT / 2,
  DAANGN_SPAWN_WORLD[2],
];

/**
 * 젠아이모 구도를 잡는 값. 여기만 만지면 된다 — 젠아이모 말고는 아무것도
 * 이 값을 보지 않는다.
 *
 * 캐릭터 몸 중앙에서 카메라를 화면 기준으로 민 양이다. 보이는 것은 반대로
 * 밀리므로, `up: -1` 이면 캐릭터가 화면에서 1 올라가 위 여백이 그만큼 줄고
 * `right: -1` 이면 캐릭터가 1 오른쪽으로 가 왼쪽 여백이 그만큼 늘어난다.
 *
 * 담는 세로가 13, 16:9 면 가로가 23.1 이다. 같은 1 이라도 위아래는 화면의
 * 8%, 좌우는 4% 라 좌우가 절반만 움직인다.
 */
export const SPAWN_VIEW_SHIFT = { right: -1, up: -1 };

const SHIFT = screenShift(
  SPAWN_VIEW_SHIFT.right,
  SPAWN_VIEW_SHIFT.up,
  GENAIMO_ELEVATION
);

/** 캐릭터가 보일 때 카메라가 볼 지점. */
export const SPAWN_VIEW_TARGET: [number, number, number] = [
  SPAWN_BODY_CENTER[0] + SHIFT[0],
  SPAWN_BODY_CENTER[1] + SHIFT[1],
  SPAWN_BODY_CENTER[2] + SHIFT[2],
];

const num = (value: number) => Number(value.toFixed(2)).toString();

export const serializeStage = (box: BuildingBox, spawn: SpawnPoint) =>
  `export const DAANGN_BUILDING: BuildingBox = {
  position: [${box.position.map(num).join(", ")}],
  size: [${box.size.map(num).join(", ")}],
};

export const DAANGN_SPAWN: SpawnPoint = {
  position: [${spawn.position.map(num).join(", ")}],
  scale: ${num(spawn.scale)},
};`;
