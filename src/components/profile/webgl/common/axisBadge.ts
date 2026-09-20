import * as THREE from "three";

import {
  PX_PER_UNIT,
  resolveFontFamily,
} from "@/components/profile/webgl/common/canvasText";

/**
 * 플랫폼마다 좌표계가 다르다. 모션을 뽑을 때 축을 맞춰 주지 않으면 캐릭터가
 * 눕거나 뒤집힌다. 그 차이를 축 세 개로 보여 주는 작은 표식.
 *
 * 공통 기준은 three.js 와 같다 — X 오른쪽, Y 위, Z 화면 바깥.
 * 각 플랫폼의 축이 그 기준에서 어디를 가리키는지 적는다.
 */
export type AxisDir = "+x" | "-x" | "+y" | "-y" | "+z" | "-z";

export type AxisSystem = {
  /** 왼손 / 오른손. */
  handed: "L" | "R";
  x: AxisDir;
  y: AxisDir;
  z: AxisDir;
};

const WORLD: Record<AxisDir, [number, number, number]> = {
  "+x": [1, 0, 0],
  "-x": [-1, 0, 0],
  "+y": [0, 1, 0],
  "-y": [0, -1, 0],
  "+z": [0, 0, 1],
  "-z": [0, 0, -1],
};

const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);

/** (1,1,1) 에서 보는 아이소메트릭. 캔버스라 화면 y 는 아래가 +. */
const project = ([x, y, z]: [number, number, number]): [number, number] => [
  (x - z) * COS30,
  (x + z) * SIN30 - y,
];

const AXIS_COLOR = { x: "#C2262B", y: "#2E7D32", z: "#1A4FB0" } as const;

export type AxisBadge = {
  texture: THREE.CanvasTexture;
  /** 정사각. 월드 유닛. */
  size: number;
};

/**
 * 축 표식을 텍스처로 굽는다. 쓰는 쪽이 `dispose()` 를 책임진다.
 *
 * @param size 한 변의 월드 크기.
 */
export const drawAxisBadge = (
  system: AxisSystem,
  size: number,
  muted: string
): AxisBadge | null => {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  const px = Math.round(size * PX_PER_UNIT);
  canvas.width = px;
  canvas.height = px;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const cx = px / 2;
  // 손 표시가 아래에 한 줄 들어간다. 그만큼 축을 위로 올린다.
  const cy = px * 0.44;
  const arm = px * 0.3;
  const font = resolveFontFamily();

  ctx.lineWidth = Math.max(2, px * 0.022);
  ctx.lineCap = "round";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  (["z", "y", "x"] as const).forEach((axis) => {
    const [dx, dy] = project(WORLD[system[axis]]);
    const ex = cx + dx * arm;
    const ey = cy + dy * arm;

    ctx.strokeStyle = AXIS_COLOR[axis];
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(ex, ey);
    ctx.stroke();

    // 글자는 축 끝에서 조금 더 밀어 선과 겹치지 않게.
    ctx.fillStyle = AXIS_COLOR[axis];
    ctx.font = `700 ${px * 0.15}px ${font}`;
    ctx.fillText(
      axis.toUpperCase(),
      cx + dx * arm * 1.32,
      cy + dy * arm * 1.32
    );
  });

  ctx.fillStyle = muted;
  ctx.font = `600 ${px * 0.12}px ${font}`;
  ctx.fillText(system.handed === "L" ? "LH" : "RH", cx, px * 0.93);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return { texture, size };
};
