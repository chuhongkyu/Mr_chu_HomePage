import type { MotionName } from "@/components/profile/webgl/character/MotionCharacter";

/** 이펙트를 붙일 수 있는 뼈. 모델 리그에 실제로 있는 이름만 둔다. */
export type MotionBone =
  | "spine001"
  | "forearmL001"
  | "thighR001"
  | "thighL001"
  | "calfR001"
  | "calfL001";

export type MotionEffect =
  /** 뼈에 붙어 도는 번개 고리. */
  | { type: "lightning"; bone: MotionBone; radius?: number; color?: number }
  /** 바닥에서 사방으로 튀는 전기 자국. 켜지는 순간 한 번 터진다. */
  | { type: "jumpTrail"; color?: number }
  /** 오른손에 들리는 붓. */
  | { type: "brush" };

/**
 * 모션마다 따라붙는 이펙트.
 *
 * 예전에는 슬라이드(포스트)마다 `effects` 를 적어두고, 그 슬라이드가 정하는
 * 애니메이션에 곁다리로 딸려오는 구조였다. 그래서 같은 동작이라도 슬라이드가
 * 다르면 이펙트가 없었고, 어떤 동작에 무엇이 붙는지 한눈에 볼 수 없었다.
 *
 * 이제는 동작 자체에 붙인다. 표 하나만 보면 되고, 새 동작을 추가할 때
 * 이펙트를 붙일지 여기서만 정하면 된다.
 */
export const MOTION_EFFECTS: Partial<Record<MotionName, MotionEffect[]>> = {
  jump: [{ type: "jumpTrail", color: 0xff9900 }],

  angry: [
    { type: "lightning", bone: "spine001", radius: 0.35, color: 0xff4400 },
    { type: "lightning", bone: "forearmL001", radius: 0.15, color: 0xff4400 },
    { type: "lightning", bone: "thighR001", radius: 0.2, color: 0xff4400 },
  ],

  // 붓질은 두 클립으로 나뉘어 있다. 둘 다 손에 붓이 들려 있어야 한다.
  brush: [{ type: "brush" }],
  brush01: [{ type: "brush" }],
};
