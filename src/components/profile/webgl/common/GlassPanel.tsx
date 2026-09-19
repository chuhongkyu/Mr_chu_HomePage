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

/** 내용물을 유리 앞면에서 이만큼 띄운다. 겹치면 z-파이팅으로 지글거린다. */
const CONTENT_LIFT = 0.01;

/** 좌우로 가를 때 이미지가 먹을 수 있는 최대 가로 비율. */
const SPLIT_MAX_IMAGE = 0.42;

/** 위아래로 가를 때 이미지가 먹는 세로 비율. */
const SPLIT_STRIP = 0.5;

/** 이미지와 글 사이 여백(월드 유닛). */
const SPLIT_GAP = 0.32;

type Rect = { width: number; height: number; x: number; y: number };

/**
 * 이미지와 글을 한 판에 나눠 담을 때 각자의 자리.
 *
 * 좌우로 가르면 이미지를 정사각으로 둔다. 원본 비율대로 두면 판마다 그림
 * 모양이 달라져서 여러 판을 세웠을 때 줄이 어긋나 보인다.
 *
 * 위아래로 가르면 판 폭을 꽉 채운 가로 띠로 둔다. 이쪽은 어차피 폭이
 * 고정이라 모양이 흔들릴 일이 없고, 길게 누운 편이 띠처럼 읽힌다.
 * 원본보다 납작해지는 만큼 위아래가 잘려 나간다.
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
  /**
   * 이미지와 글을 한 판에. `imageSide` 는 이미지가 붙는 쪽이다.
   * 좌우면 정사각, 위아래면 판 폭을 꽉 채운 가로 띠가 된다. 기본은 왼쪽.
   */
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
  /** 판의 두께. 베벨이 여기에 더 붙는다. */
  thickness?: number;
  radius?: number;
  /** 보더로 읽히는 깎인 띠의 폭. */
  bevel?: number;
  /** 내용물과 판 가장자리 사이의 여백. 보더를 가리지 않게 띄운다. */
  inset?: number;

  /** 유리 몸통 색. */
  tint?: THREE.ColorRepresentation;
  /** 가장자리에 도는 빛의 색. */
  rimColor?: THREE.ColorRepresentation;
  /** 정면에서 본 불투명도. 가장자리는 프레넬이 따로 올린다. */
  opacity?: number;
  rimPower?: number;
  rimStrength?: number;
  sheen?: number;

  /** 채울 것. 없으면 빈 유리판이다. */
  content?: GlassPanelContent;
  /**
   * 글자 크기(월드 유닛). 판 크기에 비례시키지 않는다. 비례시키면 작은
   * 판의 글씨만 작아져서, 나란히 놓았을 때 위계가 없는데도 있는 것처럼
   * 읽힌다. 대신 씬이 담는 넓이가 달라지면 여기서 맞춘다.
   */
  titleSize?: number;
  bodySize?: number;
  /** 글과 판 사이 여백(월드 유닛). */
  textPadding?: number;
  /** 켜면 제자리에서 천천히 떠다닌다. */
  float?: boolean;

  position?: [number, number, number];
  /**
   * `THREE.Euler` 를 받는다. 카메라를 정면으로 보게 하려면 회전 순서가
   * 중요해서, 순서를 지정할 수 없는 [x, y, z] 튜플만으로는 부족하다.
   * 사정은 `FastcampusScene` 의 `facing` 에 적어 뒀다.
   */
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

  // 원본을 그대로 만지면 안 된다. `useTexture` 는 URL 로 캐시해서, 같은
  // 이미지를 쓰는 다른 패널과 UV 잘라내기가 서로 덮어쓴다.
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
    // 웹폰트가 늦게 붙으면 첫 그림은 대체 폰트로 나간다. 준비되면 다시 굽는다.
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

  // 내용물은 앞면보다 앞에 세운다. 유리가 깊이를 쓰지 않으므로, 앞에 두면
  // 글과 이미지가 유리 톤을 타지 않고 또렷하게 읽힌다.
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
    // 돌리지 않는다(rotationIntensity 0). 판을 월드 축에 맞춰 세운 씬에서는
    // 조금만 돌아도 줄이 어긋나 보인다. 위아래로 흔들리기만 한다.
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.4}>
      {panel}
    </Float>
  );
});

GlassPanel.displayName = "GlassPanel";

export default GlassPanel;
