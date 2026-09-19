import * as THREE from "three";

/**
 * 웹폰트를 캔버스에 그려 텍스처로 굽는다.
 *
 * drei `Text`(troika)를 쓰지 마라. SDF 용 .ttf/.woff 가 필요한데 이 저장소의
 * Pretendard 는 next/font 가 CSS 로만 심어 둔다. 3D 용 폰트를 한 벌 더 두면
 * 자산이 갈라지고, 기본 폰트는 CDN 에서 받아 온다.
 */

export const PX_PER_UNIT = 128;

/** `ctx.font` 는 `var(--font-pretendard)` 를 해석하지 못한다. */
export const resolveFontFamily = () => {
  const fallback = "system-ui, sans-serif";
  if (typeof window === "undefined") return fallback;

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-pretendard")
    .trim();

  return value ? `${value}, ${fallback}` : fallback;
};

export type LabelSpec = {
  text: string;
  color: string;
  /** 월드 유닛. */
  size: number;
  weight?: number;
  tracking?: number;
};

export type LabelTexture = {
  texture: THREE.CanvasTexture;
  /** 글자에 딱 맞는 평면 크기(월드 유닛). */
  width: number;
  height: number;
};

/**
 * 낱말 하나를 글자에 딱 맞는 텍스처로. 평면 크기를 같이 돌려준다.
 *
 * 쓰는 쪽이 `texture.dispose()` 를 책임진다.
 */
export const drawLabel = ({
  text,
  color,
  size,
  weight = 700,
  tracking = 0.06,
}: LabelSpec): LabelTexture | null => {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const px = size * PX_PER_UNIT;
  const font = `${weight} ${px}px ${resolveFontFamily()}`;

  // 캔버스 크기를 바꾸면 컨텍스트 설정이 초기화되므로 두 번 건다.
  ctx.font = font;
  ctx.letterSpacing = `${px * tracking}px`;
  const measured = ctx.measureText(text).width;

  const pad = px * 0.28;
  canvas.width = Math.ceil(measured + pad * 2);
  canvas.height = Math.ceil(px * 1.5 + pad * 2);

  ctx.font = font;
  ctx.letterSpacing = `${px * tracking}px`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(text, pad, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return {
    texture,
    width: canvas.width / PX_PER_UNIT,
    height: canvas.height / PX_PER_UNIT,
  };
};
