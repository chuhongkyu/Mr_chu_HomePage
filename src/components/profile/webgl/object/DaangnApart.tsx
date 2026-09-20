import { type ReactNode, useEffect, useMemo, useRef } from "react";
import { Billboard, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

import { CAMERA } from "@/components/profile/constants/sceneConfig";
import { useCurrentProject } from "@/components/profile/store/useSceneStore";

export const DAANGN_APART_CLOSE = "/assets/img/daangn/daangn_apart.jpg";
export const DAANGN_APART_WIDE = "/assets/img/daangn/daangn_apart_zoom.jpg";

/**
 * 두 그림 다 가로로 넓은 판에 다시 담았다. 세로로 길던 원본은 가로가 넓은
 * 화면에서 좌우가 비었다.
 *
 * 비율이 미묘하게 달라서 상수를 따로 둔다. 한쪽 값을 다른 쪽에 쓰면
 * 그림이 늘어난다.
 */
const CLOSE_ASPECT = 1024 / 657;
const WIDE_ASPECT = 1296 / 832;

/**
 * 이미지에서 건물(채색 영역)이 차지하는 세로 비율과 그 중심 위치.
 * 두 이미지의 건물을 같은 지점에 겹치기 위해 픽셀에서 직접 측정한 값이다.
 * 나머지 영역은 전부 회색조라 채도로 깔끔하게 분리된다.
 */
const CLOSE_SUBJECT_CENTER = 0.5046;
const WIDE_SUBJECT_CENTER = 0.4893;

export const DEFAULT_CLOSE_HEIGHT = 22;

export const APPEAR_SECONDS = 0.7;

/**
 * 근경 이미지의 구역별 중심. (u, v) 는 이미지 좌상단 기준 0~1.
 *
 * 처음엔 세로로 긴 그림에서 색조로 분리해 픽셀에서 직접 쟀다. 가로로 넓은
 * 판으로 옮기면서는 같은 그림이라는 점을 이용해, 두 그림의 채색 영역
 * 경계를 재고 그 비율로 옮겼다(가로 ×0.405, 세로 ×0.981).
 */
export const CLOSE_ZONE_UV = {
  garden: [0.5159, 0.2005],
  room: [0.5285, 0.4196],
  fleamarket: [0.5046, 0.8599],
} as const;

/**
 * 근경 이미지의 (u, v) 지점을 빌보드 로컬 좌표로 바꾼다.
 * 빌보드 안쪽은 화면 좌표와 같아서, 이 좌표에 둔 것은 그림 위 같은 자리에 붙는다.
 *
 * `CLOSE_ZONE_UV` 는 픽셀에서 잰 값이므로 손대지 않고, 눈으로 맞추는 미세 조정은
 * `offsetY` 로 얹는다. 단위는 월드 기준이라 1 이면 그림 높이의 약 4.5% 다.
 */
export const closeImagePoint = (
  u: number,
  v: number,
  { height = DEFAULT_CLOSE_HEIGHT, offsetY = 0 } = {}
): [number, number, number] => [
  (u - 0.5) * height * CLOSE_ASPECT,
  (CLOSE_SUBJECT_CENTER - 0.5) * height + (0.5 - v) * height + offsetY,
  0.02,
];

export type DaangnApartProps = {
  /** 줌 인 상태에서 보이는 근경. */
  closeHeight?: number;
  /**
   * 줌 아웃 상태에서 보이는 도시 전경.
   *
   * 40 이 최대 축소 시 화면 세로(`viewHeight` 22 ÷ `zoomOutRatio` 0.55)다.
   * 이 그림은 여백 없이 가장자리까지 도시가 차 있어서, 화면을 못 덮으면
   * 그림 끝이 선으로 드러난다. 그래서 40 아래로는 내리지 않는다.
   *
   * 올리면 더 넓은 화면까지 덮지만 건물이 커진다. 45.6 이면 근경(19.4)과
   * 같아져 축소한 느낌이 사라지고, 52 면 오히려 더 커진다. 40 은 화면을
   * 덮으면서 건물이 작아 보이는(17.0) 유일한 구간이다.
   */
  wideHeight?: number;
  /**
   * 크로스페이드가 일어나는 줌 비율 구간.
   * 1.0 이 최대 확대(시작 상태), `zoomOutRatio` 가 최대 축소다.
   */
  fadeStart?: number;
  fadeEnd?: number;
  /**
   * 그림이 놓일 지점. 두 이미지의 건물 중심이 여기에 맞춰진다.
   * 화면 가운데에 두려면 카메라 target 과 같은 값을 준다.
   */
  position?: [number, number, number];
  /**
   * 빌보드 안쪽에 함께 놓을 것들. 좌표계가 화면과 같으므로
   * `closeImagePoint` 로 그림 위 지점을 그대로 지정할 수 있다.
   */
  children?: ReactNode;
};

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * 당근이네 아파트. 3D 모델이 아니라 아이소메트릭으로 그려진 PNG 두 장이다.
 *
 * 줌 인이면 근경(`daangn_apart`), 줌 아웃이면 도시 전경(`daangn_apart_zoom`).
 * 카메라 zoom 을 읽어 둘의 투명도를 매 프레임 섞는다.
 *
 * 이미 투영이 끝난 그림이라 평면을 3D 로 기울이면 투영이 두 번 먹어 깨진다.
 * 그래서 `Billboard` 로 항상 카메라를 향하게 두고 그려진 각도를 그대로 쓴다.
 *
 * 둘 다 가로로 넓은 판이라 4:3 까지는 화면을 채운다. 그보다 넓은 화면에서
 * 남는 좌우는 근경 쪽은 그림 배경이 배경색(`daangn.backdrop`)과 같아 이어져
 * 보이고, 도시 전경 쪽은 그림 끝이 드러난다.
 */
export const DaangnApart = ({
  closeHeight = DEFAULT_CLOSE_HEIGHT,
  wideHeight = 40,
  fadeStart = 0.7,
  fadeEnd = 0.9,
  position = [0, 0, 0],
  children,
}: DaangnApartProps) => {
  const [closeMap, wideMap] = useTexture(
    [DAANGN_APART_CLOSE, DAANGN_APART_WIDE],
    (textures) => {
      (Array.isArray(textures) ? textures : [textures]).forEach((t) => {
        t.colorSpace = THREE.SRGBColorSpace;
      });
    }
  );

  const closeRef = useRef<THREE.MeshBasicMaterial>(null);
  const wideRef = useRef<THREE.MeshBasicMaterial>(null);

  const appear = useRef({ v: 0 });

  useEffect(() => {
    appear.current.v = 0;
    const tween = gsap.to(appear.current, {
      v: 1,
      duration: APPEAR_SECONDS,
      ease: "power2.out",
    });
    return () => {
      tween.kill();
    };
  }, []);

  const size = useThree((state) => state.size);
  // 카메라와 같은 기준을 봐야 크로스페이드 구간이 어긋나지 않는다.
  const viewHeight = useCurrentProject().viewHeight ?? CAMERA.orthoViewHeight;

  /**
   * 그림 중심을 얼마나 옮겨야 건물 중심이 앵커에 오는지.
   * 이미지 세로 비율은 위에서부터 재므로 부호를 뒤집는다.
   */
  const closeOffsetY = (0.5 - CLOSE_SUBJECT_CENTER) * closeHeight * -1;
  const wideOffsetY = (0.5 - WIDE_SUBJECT_CENTER) * wideHeight * -1;

  const closeSize = useMemo(
    () => [closeHeight * CLOSE_ASPECT, closeHeight] as [number, number],
    [closeHeight]
  );
  const wideSize = useMemo(
    () => [wideHeight * WIDE_ASPECT, wideHeight] as [number, number],
    [wideHeight]
  );

  useFrame(({ camera }) => {
    if (!closeRef.current || !wideRef.current) return;

    // 직교 카메라의 zoom 은 화면 높이에서 역산된 값이다. 그 기준 대비 비율을 본다.
    // 원근 모드에는 zoom 개념이 없으므로 근경을 그대로 둔다.
    const ratio = (camera as THREE.OrthographicCamera).isOrthographicCamera
      ? camera.zoom / (size.height / viewHeight)
      : 1;

    const closeness = smoothstep(fadeStart, fadeEnd, ratio);
    const shown = appear.current.v;
    closeRef.current.opacity = closeness * shown;
    wideRef.current.opacity = (1 - closeness) * shown;
  });

  return (
    <Billboard position={position}>
      {/* 도시 전경이 뒤. 근경이 불투명해지면 완전히 가린다. */}
      <mesh position={[0, wideOffsetY, 0]} renderOrder={0}>
        <planeGeometry args={wideSize} />
        <meshBasicMaterial
          ref={wideRef}
          map={wideMap}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, closeOffsetY, 0.01]} renderOrder={1}>
        <planeGeometry args={closeSize} />
        <meshBasicMaterial
          ref={closeRef}
          map={closeMap}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {children}
    </Billboard>
  );
};

useTexture.preload(DAANGN_APART_CLOSE);
useTexture.preload(DAANGN_APART_WIDE);

export default DaangnApart;
