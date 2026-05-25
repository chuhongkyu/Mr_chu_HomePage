export type PlayerAnimation = "angry" | "idle" | "jump" | "t-pose";

export type SceneTheme = {
  colorTop: string;
  colorBottom: string;
};

export type BoneKey =
  | "thighR001"
  | "thighL001"
  | "forearmL001"
  | "forearmR001"
  | "spine001"
  | "calfR001"
  | "calfL001";

export type LightningEffect = {
  type: "lightning";
  boneKey: BoneKey;
  radius?: number;
  color?: string | number;
};

export type JumpTrailEffect = {
  type: "jumpTrail";
  boneKey: BoneKey;
  color?: string | number;
};

export type SlideEffect = LightningEffect | JumpTrailEffect;

export type SlideCamera = {
  azimuthOffset?: number; // 초기 azimuth 기준 라디안 오프셋 (음수 = 오른쪽)
};

export type SlideConfig = {
  animation: PlayerAnimation;
  theme: SceneTheme;
  camera: SlideCamera;
  effects: SlideEffect[];
};

export const SLIDE_CONFIGS: SlideConfig[] = [
  // 0 - 패캠
  {
    animation: "idle",
    theme: { colorTop: "#faf6f0", colorBottom: "#b8ae9e" },
    camera: {},
    effects: [],
  },
  // 1 - GDC
  {
    animation: "jump",
    theme: { colorTop: "#ddeeff", colorBottom: "#2a4a6a" },
    camera: { azimuthOffset: 0.65 },
    effects: [{ type: "jumpTrail", boneKey: "spine001", color: 0xff9900 }],
  },
  // 2 - 당근마켓
  {
    animation: "angry",
    theme: { colorTop: "#fff4ec", colorBottom: "#FF6F0F" },
    camera: {},
    effects: [
      { type: "lightning", boneKey: "spine001", radius: 0.35, color: 0xff4400 },
      {
        type: "lightning",
        boneKey: "forearmL001",
        radius: 0.15,
        color: 0xff4400,
      },
      { type: "lightning", boneKey: "thighR001", radius: 0.2, color: 0xff4400 },
    ],
  },
];
