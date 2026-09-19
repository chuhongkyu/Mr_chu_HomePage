import { forwardRef, ReactNode, Suspense, useEffect, useMemo, useState } from "react";
import { Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

import {
  createGlassMaterial,
  createPanelGeometry,
  panelDepth,
} from "@/components/profile/webgl/common/glassPanelGeometry";
import {
  coverTexture,
  drawPanelText,
} from "@/components/profile/webgl/common/glassPanelTexture";
import { color } from "@/style/tokens.generated";

/** 겹치면 z-파이팅으로 지글거린다. */
const CONTENT_LIFT = 0.01;

const SPLIT_MAX_IMAGE = 0.42;
const SPLIT_STRIP = 0.5;
const SPLIT_GAP = 0.32;

type Rect = { width: number; height: number; x: number; y: number };

/**
 * 좌우로 가르면 이미지를 정사각으로 둔다. 원본 비율대로 두면 판마다 그림
 * 모양이 달라져 여러 판을 세웠을 때 줄이 어긋난다.
 */
const splitLayout = (
  side: "left" | "right" | "top" | "bottom",
  width: number,
  height: number
): { image: Rect; text: Rect } => {
  if (side === "left" || side === "right") {
    const size = Math.min(height, width * SPLIT_MAX_IMAGE);
    const textWidth = Math.max(width - size - SPLIT_GAP, 0.1);
    const first = side === "left";

    return {
      image: {
        width: size,
        height: size,
        x: first ? -width / 2 + size / 2 : width / 2 - size / 2,
        y: 0,
      },
      text: {
        width: textWidth,
        height,
        x: first ? width / 2 - textWidth / 2 : -width / 2 + textWidth / 2,
        y: 0,
      },
    };
  }

  const imageHeight = height * SPLIT_STRIP;
  const textHeight = Math.max(height - imageHeight - SPLIT_GAP, 0.1);
  const first = side === "top";

  return {
    image: {
      width,
      height: imageHeight,
      x: 0,
      y: first ? height / 2 - imageHeight / 2 : -height / 2 + imageHeight / 2,
    },
    text: {
      width,
      height: textHeight,
      x: 0,
      y: first ? -height / 2 + textHeight / 2 : height / 2 - textHeight / 2,
    },
  };
};

export type GlassPanelContent =
  | { kind: "image"; src: string }
  | { kind: "text"; eyebrow?: string; title?: string; body?: string }
  /** 좌우면 정사각, 위아래면 판 폭을 꽉 채운 가로 띠. */
  | {
      kind: "split";
      src: string;
      imageSide?: "left" | "right" | "top" | "bottom";
      eyebrow?: string;
      title?: string;
      body?: string;
    };

export type GlassPanelProps = {
  width?: number;
  height?: number;
  /** 베벨이 여기에 더 붙는다. */
  thickness?: number;
  radius?: number;
  /** 보더로 읽히는 깎인 띠의 폭. */
  bevel?: number;
  inset?: number;

  tint?: THREE.ColorRepresentation;
  rimColor?: THREE.ColorRepresentation;
  /** 정면 기준. 가장자리는 프레넬이 따로 올린다. */
  opacity?: number;
  rimPower?: number;
  rimStrength?: number;
  sheen?: number;

  content?: GlassPanelContent;
  /** 월드 유닛. 판 크기에 비례시키지 마라 — 없는 위계가 생긴 것처럼 읽힌다. */
  titleSize?: number;
  bodySize?: number;
  textPadding?: number;
  float?: boolean;

  position?: [number, number, number];
  rotation?: THREE.Euler | [number, number, number];
  /** 내용물을 직접 넣고 싶을 때. `content` 대신 쓴다. */
  children?: ReactNode;
};

/** 이미지 한 장을 판 안쪽에 비율 그대로 채운다. */
const PanelImage = ({
  src,
  width,
  height,
  x = 0,
  y = 0,
}: {
  src: string;
  width: number;
  height: number;
  x?: number;
  y?: number;
}) => {
  const loaded = useTexture(src);

  // `useTexture` 는 URL 로 캐시한다. 원본을 만지면 같은 이미지를 쓰는
  // 다른 판과 UV 잘라내기가 서로 덮어쓴다.
  const texture = useMemo(() => {
    const clone = loaded.clone();
    coverTexture(clone, width, height);
    return clone;
  }, [loaded, width, height]);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <mesh renderOrder={1} position={[x, y, 0]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} transparent />
    </mesh>
  );
};

type PanelTextProps = {
  spec: {
    eyebrow?: string;
    title?: string;
    body?: string;
  };
  width: number;
  height: number;
  titleSize: number;
  bodySize: number;
  padding: number;
  x?: number;
  y?: number;
};

/** 글을 캔버스에 구워 판 안쪽에 얹는다. */
const PanelText = ({
  spec,
  width,
  height,
  titleSize,
  bodySize,
  padding,
  x = 0,
  y = 0,
}: PanelTextProps) => {
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let current: THREE.CanvasTexture | null = null;
    let alive = true;

    const paint = () => {
      if (!alive) return;
      const next = drawPanelText({
        eyebrow: spec.eyebrow,
        title: spec.title,
        body: spec.body,
        width,
        height,
        color: color.gray[0],
        mutedColor: color.alpha.white[60],
        padding,
        titleSize,
        bodySize,
      });
      if (!next) return;
      current?.dispose();
      current = next;
      setTexture(next);
    };

    paint();
    // 웹폰트가 늦게 붙으면 첫 그림이 대체 폰트로 나간다.
    document.fonts?.ready.then(paint).catch(() => {});

    return () => {
      alive = false;
      current?.dispose();
    };
  }, [spec.eyebrow, spec.title, spec.body, width, height, titleSize, bodySize, padding]);

  if (!texture) return null;

  return (
    <mesh renderOrder={1} position={[x, y, 0]}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  );
};

/**
 * 공중에 뜬 유리판.
 *
 * 글이나 이미지를 담아 여러 자리에 띄우는 조각이다. 보더는 따로 만든 링이
 * 아니라 판을 깎아낸 베벨이고, 그 띠의 노멀이 바깥을 향해서 프레넬이 저절로
 * 밝힌다. 자세한 사정은 `glassPanelGeometry.ts` 에 적어 뒀다.
 *
 * 기본값은 붉은 배경(패스트캠퍼스 씬)에서 맞춰 뒀다. 다른 배경에 올릴 때는
 * `tint` 와 `opacity` 를 만진다.
 */
export const GlassPanel = forwardRef<THREE.Group, GlassPanelProps>(({
  width = 6,
  height = 4,
  thickness = 0.12,
  radius = 0.3,
  bevel = 0.06,
  inset = 0.34,

  // `THREE.Color` 는 rgba() 를 못 읽어서 알파 토큰을 쓸 수 없다.
  // 투명도는 색이 아니라 `opacity` 가 맡는다.
  tint = color.gray[0],
  rimColor = color.gray[0],
  opacity = 0.16,
  rimPower = 2.4,
  rimStrength = 0.75,
  sheen = 0.12,

  content,
  titleSize = 0.46,
  bodySize = 0.3,
  textPadding = 0.28,
  float = false,
  position,
  rotation,
  children,
}, ref) => {
  const geometry = useMemo(
    () => createPanelGeometry({ width, height, thickness, radius, bevel }),
    [width, height, thickness, radius, bevel],
  );

  const material = useMemo(
    () =>
      createGlassMaterial({
        tint,
        rimColor,
        opacity,
        rimPower,
        rimStrength,
        sheen,
        width,
        height,
      }),
    [tint, rimColor, opacity, rimPower, rimStrength, sheen, width, height],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  const contentWidth = Math.max(width - inset * 2, 0.1);
  const contentHeight = Math.max(height - inset * 2, 0.1);

  // 유리가 깊이를 쓰지 않으므로, 앞에 둬야 글과 이미지가 유리 톤을 안 탄다.
  const contentZ = panelDepth(thickness, bevel) / 2 + CONTENT_LIFT;

  const split =
    content?.kind === "split"
      ? splitLayout(content.imageSide ?? "left", contentWidth, contentHeight)
      : null;

  const panel = (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh geometry={geometry} material={material} />

      <group position={[0, 0, contentZ]}>
        <Suspense fallback={null}>
          {content?.kind === "image" && (
            <PanelImage src={content.src} width={contentWidth} height={contentHeight} />
          )}
          {content?.kind === "text" && (
            <PanelText
              spec={content}
              width={contentWidth}
              height={contentHeight}
              titleSize={titleSize}
              bodySize={bodySize}
              padding={textPadding}
            />
          )}
          {content?.kind === "split" && split && (
            <>
              <PanelImage src={content.src} {...split.image} />
              <PanelText
                spec={content}
                {...split.text}
                titleSize={titleSize}
                bodySize={bodySize}
                padding={textPadding}
              />
            </>
          )}
          {children}
        </Suspense>
      </group>
    </group>
  );

  if (!float) return panel;

  return (
    // rotationIntensity 0. 월드 축에 맞춰 세운 씬이라 조금만 돌아도 줄이 어긋난다.
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.4}>
      {panel}
    </Float>
  );
});

GlassPanel.displayName = "GlassPanel";

export default GlassPanel;
