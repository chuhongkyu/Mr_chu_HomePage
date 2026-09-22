"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

import HotspotMarker, {
  type HotspotMarkerProps,
  type HotspotPlacement,
} from "@/components/profile/common/HotspotMarker";
import { layer } from "@/style/tokens.generated";
import { track } from "@/utils/analytics";

import styles from "@/components/profile/webgl/common/SceneHotspot.module.scss";

/** 화면 아래쪽 어디부터를 "아래"로 볼지. 0.5 면 화면 절반. */
const LOWER_HALF = 0.42;

/** 이보다 좁으면 어느 쪽으로 펴든 가장자리를 넘는다. */
const CENTER_CARD_MAX_WIDTH = 768;

export type SceneHotspotProps = Omit<
  HotspotMarkerProps,
  "open" | "onToggle" | "placement"
> & {
  /** 점이 붙을 3D 좌표. 카메라를 옮겨도 계속 따라붙는다. */
  position: [number, number, number];
  /**
   * 카드가 펴지는 세로 방향.
   * "auto" 는 열 때마다 앵커의 화면 위치를 보고 정한다.
   * 화면 아래쪽에 있으면 위로 펴서 카드가 잘리지 않게 한다.
   */
  placement?: HotspotPlacement | "auto";
  /** 씬에 들어오고 이만큼 지난 뒤에 나타난다(초). 그림이 먼저 서야 한다. */
  appearDelay?: number;
  /** 줌이 이 구역을 벗어나면 물러난다. */
  hidden?: boolean;
};

/**
 * 3D 좌표에 붙는 핫스팟.
 *
 * `Html` 은 투영된 화면 좌표에 DOM 을 올려준다. `distanceFactor` 를 주지
 * 않으므로 카메라 거리와 무관하게 항상 같은 픽셀 크기로 보인다.
 */
export const SceneHotspot = ({
  position,
  placement = "auto",
  appearDelay = 0,
  hidden = false,
  onMore,
  ...marker
}: SceneHotspotProps) => {
  const anchorRef = useRef<THREE.Group>(null);
  const worldPoint = useRef(new THREE.Vector3());
  /** 바깥 클릭 판정을 위한 DOM 경계. Html 이 포탈로 내보낸 실제 노드다. */
  const markerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [resolved, setResolved] = useState<HotspotPlacement>(
    placement === "auto" ? "down" : placement
  );

  const camera = useThree((state) => state.camera);

  /**
   * `IntersectionObserver` 를 쓰지 마라. 잘린 뒤에야 알려 줘서 카드가 한 번
   * 잘못 뜬 다음 튀어 옮겨 간다.
   */
  const centered = useMediaQuery({
    query: `(max-width: ${CENTER_CARD_MAX_WIDTH}px)`,
  });

  const toggle = useCallback(() => {
    // 열기 직전에만 방향을 정한다. 열려 있는 동안 카드가 튀지 않게.
    if (!open && placement === "auto" && anchorRef.current) {
      const ndc = anchorRef.current
        .getWorldPosition(worldPoint.current)
        .project(camera);
      // NDC 는 위가 +1. 앵커가 화면 아래쪽이면 카드를 위로 편다.
      setResolved(ndc.y < LOWER_HALF * 2 - 1 ? "up" : "down");
    }
    if (!open) track("hotspot_opened", { zone: marker.label });
    setOpen((prev) => !prev);
  }, [open, placement, camera, marker.label]);

  /** 열어 둔 채로 시트를 띄우면 배경막이 두 겹으로 깔린다. */
  const openMore = useMemo(
    () =>
      onMore
        ? () => {
            setOpen(false);
            onMore();
          }
        : undefined,
    [onMore]
  );

  // 카드 밖을 누르거나 Esc 를 누르면 닫힌다.
  // 다른 핫스팟을 누르면 이쪽이 닫히고 저쪽이 열리므로, 한 번에 하나만 열린다.
  // 물러나는 중에 카드가 열려 있으면 허공에 카드만 남는다.
  useEffect(() => {
    if (hidden) setOpen(false);
  }, [hidden]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (markerRef.current?.contains(target)) return;
      // 가운데 띄운 카드는 앵커 DOM 밖에 있다.
      if (target instanceof Element && target.closest("[data-hotspot-card]")) {
        return;
      }
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <group ref={anchorRef} position={position}>
      {/* BottomSheet 가 배경막 10, 시트 11 을 쓴다.
          그보다 낮게 둬야 모달이 열렸을 때 점·선이 위로 뚫고 올라오지 않는다. */}
      <Html zIndexRange={[layer["scene-html"], 0]} className={styles.layer}>
        <div
          ref={markerRef}
          className={styles.marker}
          data-hidden={hidden}
          style={{ "--appear-delay": `${appearDelay}s` } as React.CSSProperties}
        >
          <HotspotMarker
            {...marker}
            onMore={openMore}
            placement={placement === "auto" ? resolved : placement}
            centered={centered}
            open={open}
            onToggle={toggle}
          />
        </div>
      </Html>
    </group>
  );
};

export default SceneHotspot;
