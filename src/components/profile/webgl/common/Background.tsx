import { useEffect, useMemo,useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  DEFAULT_THEME,
  usePlayerStore,
} from "@/components/profile/store/usePlayerStore";
import fragmentShader from "@/shaders/background.frag.glsl";
import vertexShader from "@/shaders/background.vert.glsl";

const LERP = 0.05;

export const Background = () => {
  // useMemo로 uniform 객체를 딱 한 번만 생성 → re-render마다 R3F가 교체하지 않음
  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color(DEFAULT_THEME.color) },
    }),
    []
  );

  const tgtColor = useRef(new THREE.Color(DEFAULT_THEME.color));

  useEffect(() => {
    const initial = usePlayerStore.getState().theme;
    tgtColor.current.set(initial.color);

    return usePlayerStore.subscribe((state) => {
      tgtColor.current.set(state.theme.color);
    });
  }, []);

  useFrame(() => {
    uniforms.color.value.lerp(tgtColor.current, LERP);
  });

  return (
    <mesh renderOrder={-1} frustumCulled={false}>
      <planeGeometry args={[3, 3]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
        uniforms={uniforms}
      />
    </mesh>
  );
};
