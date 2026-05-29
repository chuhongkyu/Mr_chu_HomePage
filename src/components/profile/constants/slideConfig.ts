export type PlayerAnimation =
  | "angry"
  | "idle"
  | "jump"
  | "t-pose"
  | "running"
  | "thinking"
  | "brush"
  | "brush01";

export type SceneTheme = {
  color: string;
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

export type SlideReward = "hat";

export type SlideConfig = {
  animation: PlayerAnimation;
  theme: SceneTheme;
  camera: SlideCamera;
  effects: SlideEffect[];
  characterColor?: string;
  characterEmissive?: string;
  postId?: string;
  reward?: SlideReward;
};

export const SLIDE_CONFIGS: SlideConfig[] = [
  // 0 - 한국화 미디어 아트 (brush)
  {
    animation: "brush",
    theme: { color: "#ffffff" },
    camera: { azimuthOffset: 0.75 },
    effects: [],
    characterColor: "#ffffff",
    characterEmissive: "#c8c0b8",
    postId: "artme_brush",
  },
  // 1 - 패캠
  {
    animation: "idle",
    theme: { color: "#c9c1b4" },
    camera: {},
    effects: [],
    postId: "7122521989285625856",
    reward: "hat",
  },
  // 2 - GDC
  {
    animation: "jump",
    theme: { color: "#33ccf2" },
    camera: { azimuthOffset: 0.65 },
    effects: [{ type: "jumpTrail", boneKey: "spine001", color: 0xff9900 }],
    characterColor: "#b8d4f8",
    characterEmissive: "#4a90d9",
    postId: "7310031891129143297",
  },
  // 3 - 당근마켓
  {
    animation: "angry",
    theme: { color: "#fcc038" },
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
    characterColor: "#FF6F0F",
    characterEmissive: "#f29333",
  },
];
