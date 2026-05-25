"use client";

import { useEffect, useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { CAMERA } from "@/components/profile/constants/sceneConfig";
import { SLIDE_CONFIGS } from "@/components/profile/constants/slideConfig";
import { usePlayerStore } from "@/components/profile/store/usePlayerStore";

const CameraManager = () => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const slideIndex = usePlayerStore((s) => s.slideIndex);

  const slideIndexRef = useRef(slideIndex);
  useEffect(() => {
    slideIndexRef.current = slideIndex;
  }, [slideIndex]);

  useFrame(() => {
    const ctrl = controlsRef.current as any;
    if (!ctrl) return;
    if (typeof ctrl.getAzimuthalAngle !== "function") return;
    if (typeof ctrl.setAzimuthalAngle !== "function") return;

    const offset =
      SLIDE_CONFIGS[slideIndexRef.current]?.camera?.azimuthOffset ?? 0;
    const target = CAMERA.initialAzimuth + offset;

    const current = ctrl.getAzimuthalAngle();
    const diff = target - current;
    if (Math.abs(diff) < 0.001) return;

    ctrl.setAzimuthalAngle(current + diff * CAMERA.azimuthLerpFactor);
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={CAMERA.fov}
        position={CAMERA.position}
        near={CAMERA.near}
        far={CAMERA.far}
      />
      <OrbitControls
        ref={controlsRef}
        target={CAMERA.target}
        enablePan={false}
        enableZoom
        enableRotate
        minDistance={CAMERA.minDistance}
        maxDistance={CAMERA.maxDistance}
        minPolarAngle={CAMERA.minPolarAngle}
        maxPolarAngle={CAMERA.maxPolarAngle}
        makeDefault
      />
    </>
  );
};

export default CameraManager;
