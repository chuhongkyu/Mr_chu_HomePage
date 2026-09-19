"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

import HotspotMarker, {
  type HotspotMarkerProps,
  type HotspotPlacement,
} from "@/components/profile/common/HotspotMarker";

/** 화면 아래쪽 어디부터를 "아래"로 볼지. 0.5 면 화면 절반. */
const LOWER_HALF = 0.42;

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

  const toggle = useCallback(() => {
    // 열기 직전에만 방향을 정한다. 열려 있는 동안 카드가 튀지 않게.
    if (!open && placement === "auto" && anchorRef.current) {
      const ndc = anchorRef.current
        .getWorldPosition(worldPoint.current)
        .project(camera);
      // NDC 는 위가 +1. 앵커가 화면 아래쪽이면 카드를 위로 편다.
      setResolved(ndc.y < LOWER_HALF * 2 - 1 ? "up" : "down");
    }
    setOpen((prev) => !prev);
  }, [open, placement, camera]);

  // 카드 밖을 누르거나 Esc 를 누르면 닫힌다.
  // 다른 핫스팟을 누르면 이쪽이 닫히고 저쪽이 열리므로, 한 번에 하나만 열린다.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (markerRef.current?.contains(event.target as Node)) return;
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
      <Html zIndexRange={[9, 0]} style={{ pointerEvents: "none" }}>
        <div ref={markerRef} style={{ pointerEvents: "auto" }}>
          <HotspotMarker
            {...marker}
            placement={placement === "auto" ? resolved : placement}
            open={open}
            onToggle={toggle}
          />
        </div>
      </Html>
    </group>
  );
};

export default SceneHotspot;
