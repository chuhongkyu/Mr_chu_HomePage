import * as THREE from "three";

/**
 * 웹폰트를 캔버스에 그려 텍스처로 굽는다.
 *
 * troika 기반의 drei `Text` 를 쓰지 않는다. 그건 SDF 를 만들 .ttf/.woff 가
 * 있어야 하는데, 이 저장소의 Pretendard 는 next/font 가 CSS 로만 심어 둔다.
 * 폰트 파일을 3D 용으로 한 벌 더 두면 자산이 갈라지고 용량도 두 배가 된다.
 * 기본 폰트(Roboto)를 CDN 에서 받아 오는 것도 곤란하다. 캔버스는 이미 떠
 * 있는 웹폰트를 그대로 쓴다.
 */

/** 월드 1 유닛을 텍스처 몇 픽셀로 구울지. 글자가 뭉개지지 않을 만큼만 준다. */
export const PX_PER_UNIT = 128;

/**
 * next/font 가 만든 실제 font-family 이름을 꺼낸다.
 * `ctx.font` 는 `var(--font-pretendard)` 를 해석하지 못해서, CSS 변수의
 * 계산된 값을 직접 읽어야 한다.
 */
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
  /** 글자 크기(월드 유닛). */
  size: number;
  weight?: number;
  /** 글자 사이를 벌리는 정도. 짧은 낱말을 표지처럼 보이게 한다. */
  tracking?: number;
};

export type LabelTexture = {
  texture: THREE.CanvasTexture;
  /** 글자에 딱 맞는 평면 크기(월드 유닛). */
  width: number;
  height: number;
};

/**
 * 낱말 하나를 글자에 딱 맞는 텍스처로 굽는다.
 *
 * 평면 크기를 같이 돌려준다. 고정 크기 평면에 그리면 글자 길이에 따라
 * 여백이 들쭉날쭉해지는데, 낱말마다 평면을 맞추면 그럴 일이 없다.
 *
 * 쓰는 쪽이 `texture.dispose()` 를 책임진다. 브라우저가 없으면 null.
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

  // 재기 먼저. 캔버스 크기를 바꾸면 컨텍스트 설정이 초기화되므로 두 번 건다.
  ctx.font = font;
  ctx.letterSpacing = `${px * tracking}px`;
  const measured = ctx.measureText(text).width;

  // 글자가 잘리지 않을 만큼의 테두리 여백. 글자 크기에 비례시킨다.
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
