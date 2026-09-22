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
import { CAMERA } from "@/components/profile/constants/sceneConfig";
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

/**
 * 캐릭터가 들어가지 못하는 구역. 첫 칸이 그림 속 건물이다.
 *
 * 그림은 2D 한 장이라 어디가 막힌 곳인지 3D 가 알 방법이 없다. 그래서
 * 손으로 상자를 얹어 둔다. y 는 막는 데 쓰지 않지만(바닥을 걷는 캐릭터라
 * 높이로 갈릴 일이 없다) 편집기에서 그림과 겹쳐 보려면 필요하다.
 *
 * 값은 `?mode=edit` 의 "당근이네 배치" 에서 맞춘 뒤 TS 복사로 붙여 넣는다.
 */
export const DAANGN_COLLIDERS: BuildingBox[] = [
  { position: [1, 2.5, 0], size: [10, 12, 8] },
  { position: [-3.39, -2, 7.08], size: [4, 4, 4] },
  { position: [5.69, -2, 5.76], size: [4, 4, 4] },
];

export const DAANGN_SPAWN: SpawnPoint = {
  position: [0.87, -4, 5.42],
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
 * 캐릭터가 보일 때 카메라가 볼 지점. 젠아이모만 쓴다.
 *
 * 모델 원점이 발밑이라 발을 그대로 보면 몸이 화면 위쪽에 쏠린다. 키의
 * 절반만큼 올려서 몸 중앙을 가운데에 둔다. 키는 그림에 맞춰 줄인 쪽이다.
 * 원래 키로 재면 캐릭터 머리 위 한참을 보게 된다.
 */
export const SPAWN_VIEW_TARGET: [number, number, number] = [
  DAANGN_SPAWN_WORLD[0],
  DAANGN_SPAWN_WORLD[1] + SPAWN_CHARACTER_HEIGHT / 2,
  DAANGN_SPAWN_WORLD[2],
];

const num = (value: number) => Number(value.toFixed(2)).toString();

const box = (item: BuildingBox) =>
  `  { position: [${item.position.map(num).join(", ")}], size: [${item.size
    .map(num)
    .join(", ")}] },`;

export const serializeStage = (boxes: BuildingBox[], spawn: SpawnPoint) =>
  `export const DAANGN_COLLIDERS: BuildingBox[] = [
${boxes.map(box).join("\n")}
];

export const DAANGN_SPAWN: SpawnPoint = {
  position: [${spawn.position.map(num).join(", ")}],
  scale: ${num(spawn.scale)},
};`;
