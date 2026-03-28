"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

import { GRID_CENTER } from "@/components/profile/inventory/InventoryGridEngine";
import { useInventoryStore } from "@/components/profile/store/useInventoryStore";
import { useProfilePlacementStore } from "@/components/profile/store/useProfilePlacementStore";

const [cx, cy, cz] = GRID_CENTER;

const PERSPECTIVE_POSITION = new THREE.Vector3(cx + 15, 15, cz + 15);
const PERSPECTIVE_INVENTORY_POSITION = new THREE.Vector3(cx + 20, 22, cz + 20);
const ISOMETRIC_POSITION = new THREE.Vector3(cx + 16, 16, cz + 16);
const ISO_ZOOM = 70;
const ISO_INVENTORY_ZOOM = 52;
const LERP = 0.06;

// ─── Lerp Animator (R3F useFrame) ────────────────────────────────────
const CameraAnimator = () => {
  const { camera } = useThree();
  const cameraMode = useInventoryStore((s) => s.cameraMode);
  const isInventoryOpen = useProfilePlacementStore((s) => s.isInventoryOpen);

  const targetPos = useRef(new THREE.Vector3());
  const targetZoom = useRef(ISO_ZOOM);

  useEffect(() => {
    if (cameraMode === "perspective") {
      targetPos.current.copy(
        isInventoryOpen ? PERSPECTIVE_INVENTORY_POSITION : PERSPECTIVE_POSITION
      );
    } else {
      targetPos.current.copy(ISOMETRIC_POSITION);
      targetZoom.current = isInventoryOpen ? ISO_INVENTORY_ZOOM : ISO_ZOOM;
    }
  }, [cameraMode, isInventoryOpen]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, LERP);

    if (cameraMode === "isometric") {
      const ortho = camera as THREE.OrthographicCamera;
      ortho.zoom = THREE.MathUtils.lerp(ortho.zoom, targetZoom.current, LERP);
      ortho.updateProjectionMatrix();
    }
  });

  return null;
};

// ─── Camera Manager ───────────────────────────────────────────────────
const CameraManager = () => {
  const cameraMode = useInventoryStore((s) => s.cameraMode);
  const isInventoryOpen = useProfilePlacementStore((s) => s.isInventoryOpen);

  return (
    <>
      {cameraMode === "perspective" ? (
        <PerspectiveCamera
          makeDefault
          fov={30}
          position={PERSPECTIVE_POSITION.toArray()}
          near={0.1}
          far={200}
        />
      ) : (
        <OrthographicCamera
          makeDefault
          zoom={ISO_ZOOM}
          position={ISOMETRIC_POSITION.toArray()}
          near={0.1}
          far={500}
        />
      )}

      <CameraAnimator />

      <OrbitControls
        target={[cx, cy + 4, cz]}
        enablePan
        enableZoom={!isInventoryOpen}
        enableRotate={cameraMode === "perspective" && !isInventoryOpen}
        minDistance={12}
        maxDistance={30}
        minZoom={10}
        maxZoom={100}
        makeDefault
      />
    </>
  );
};

export default CameraManager;
