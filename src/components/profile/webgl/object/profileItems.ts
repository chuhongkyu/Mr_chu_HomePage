export type ProfileItemDef = {
  code: string;
  label: string;
  color: string;
  /** grid cell width */
  w: number;
  /** grid cell depth */
  h: number;
  /** 3D height */
  height: number;
};

export const PROFILE_ITEMS: ProfileItemDef[] = [
  { code: "bench", label: "Bench", color: "#8b6f47", w: 2, h: 1, height: 2.0 },
  {
    code: "iceCube",
    label: "얼음큐브",
    color: "#b3e5fc",
    w: 1,
    h: 1,
    height: 2,
  },
  { code: "plant", label: "Plant", color: "#5bd97a", w: 1, h: 1, height: 3.0 },
  {
    code: "crystal",
    label: "Crystal",
    color: "#00aaff",
    w: 1,
    h: 1,
    height: 2.0,
  },
  { code: "table", label: "Table", color: "#c45bd9", w: 1, h: 1, height: 1.5 },
  { code: "rock", label: "Rock", color: "#94a3b8", w: 1, h: 1, height: 2 },
  {
    code: "barrel",
    label: "Barrel",
    color: "#d97a5b",
    w: 1,
    h: 1,
    height: 4,
  },
];

export const PROFILE_ITEM_MAP = Object.fromEntries(
  PROFILE_ITEMS.map((item) => [item.code, item])
) as Record<string, ProfileItemDef>;
