import * as THREE from "three";

import { resolveFontFamily } from "@/components/profile/webgl/common/canvasText";

/**
 * 패널에 올릴 글을 캔버스에 그려 텍스처로 굽는다.
 *
 * 캔버스에 그리는 이유는 `canvasText` 에 적어 뒀다.
 */

const PX_PER_UNIT = 128;

/** 큰 판에서 텍스처가 메모리를 잡아먹는 걸 막는다. */
const MAX_PX = 2048;

export type PanelTextSpec = {
  eyebrow?: string;
  title?: string;
  body?: string;
  /** 월드 크기. */
  width: number;
  height: number;
  color: string;
  mutedColor: string;
  padding: number;
  titleSize: number;
  bodySize: number;
};

/** 한국어는 띄어쓰기 없이 길게 이어지는 경우가 많아 글자 단위 처리가 필요하다. */
const wrapLines = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const lines: string[] = [];

  for (const paragraph of text.split("\n")) {
    let line = "";

    for (const word of paragraph.split(" ")) {
      const candidate = line ? `${line} ${word}` : word;
      if (ctx.measureText(candidate).width <= maxWidth) {
        line = candidate;
        continue;
      }

      if (line) lines.push(line);

      let chunk = "";
      for (const char of word) {
        if (ctx.measureText(chunk + char).width > maxWidth && chunk) {
          lines.push(chunk);
          chunk = char;
        } else {
          chunk += char;
        }
      }
      line = chunk;
    }

    lines.push(line);
  }

  return lines;
};

/** 쓰는 쪽이 `dispose()` 를 책임진다. */
export const drawPanelText = (spec: PanelTextSpec): THREE.CanvasTexture | null => {
  if (typeof document === "undefined") return null;

  const scale = Math.min(PX_PER_UNIT, MAX_PX / Math.max(spec.width, spec.height));

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(spec.width * scale);
  canvas.height = Math.round(spec.height * scale);

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const family = resolveFontFamily();
  const pad = spec.padding * scale;
  const maxWidth = canvas.width - pad * 2;

  ctx.textBaseline = "top";

  let y = pad;

  if (spec.eyebrow) {
    const size = spec.bodySize * scale * 0.85;
    ctx.font = `600 ${size}px ${family}`;
    ctx.fillStyle = spec.mutedColor;
    ctx.letterSpacing = `${size * 0.08}px`;
    ctx.fillText(spec.eyebrow.toUpperCase(), pad, y, maxWidth);
    ctx.letterSpacing = "0px";
    y += size * 2;
  }

  if (spec.title) {
    const size = spec.titleSize * scale;
    ctx.font = `700 ${size}px ${family}`;
    ctx.fillStyle = spec.color;

    for (const line of wrapLines(ctx, spec.title, maxWidth)) {
      ctx.fillText(line, pad, y);
      y += size * 1.3;
    }
    y += size * 0.45;
  }

  if (spec.body) {
    const size = spec.bodySize * scale;
    ctx.font = `400 ${size}px ${family}`;
    ctx.fillStyle = spec.mutedColor;

    for (const line of wrapLines(ctx, spec.body, maxWidth)) {
      // 잘린 글자가 반쯤 보이는 게 더 지저분하다.
      if (y + size > canvas.height - pad) break;
      ctx.fillText(line, pad, y);
      y += size * 1.5;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  return texture;
};

/** CSS `object-fit: cover`. 평면을 늘리면 이미지가 판 밖으로 비어져 나간다. */
export const coverTexture = (texture: THREE.Texture, width: number, height: number) => {
  const image = texture.image as { width?: number; height?: number } | undefined;
  if (!image?.width || !image?.height) return;

  const imageAspect = image.width / image.height;
  const boxAspect = width / height;

  if (imageAspect > boxAspect) {
    const ratio = boxAspect / imageAspect;
    texture.repeat.set(ratio, 1);
    texture.offset.set((1 - ratio) / 2, 0);
  } else {
    const ratio = imageAspect / boxAspect;
    texture.repeat.set(1, ratio);
    texture.offset.set(0, (1 - ratio) / 2);
  }

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
};
