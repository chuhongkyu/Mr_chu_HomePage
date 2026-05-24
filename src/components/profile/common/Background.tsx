import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  usePlayerStore,
  DEFAULT_THEME,
} from "@/components/profile/store/usePlayerStore";

// NDC quad: 화면 전체를 덮는 배경, 카메라 방향과 무관하게 항상 위=밝고 아래=어둡게
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 1.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform vec3 colorTop;
  uniform vec3 colorBottom;
  void main() {
    float t = smoothstep(0.0, 0.8, vUv.y);
    gl_FragColor = vec4(mix(colorBottom, colorTop, t), 1.0);
  }
`;

const LERP = 0.05;

export const Background = () => {
  // useMemo로 uniform 객체를 딱 한 번만 생성 → re-render마다 R3F가 교체하지 않음
  const uniforms = useMemo(
    () => ({
      colorTop: { value: new THREE.Color(DEFAULT_THEME.colorTop) },
      colorBottom: { value: new THREE.Color(DEFAULT_THEME.colorBottom) },
    }),
    []
  );

  const tgtTop = useRef(new THREE.Color(DEFAULT_THEME.colorTop));
  const tgtBottom = useRef(new THREE.Color(DEFAULT_THEME.colorBottom));

  useEffect(() => {
    const initial = usePlayerStore.getState().theme;
    tgtTop.current.set(initial.colorTop);
    tgtBottom.current.set(initial.colorBottom);

    return usePlayerStore.subscribe((state) => {
      tgtTop.current.set(state.theme.colorTop);
      tgtBottom.current.set(state.theme.colorBottom);
    });
  }, []);

  // uniforms.colorTop.value 를 직접 lerp → Three.js가 항상 같은 Color 객체를 읽음
  useFrame(() => {
    uniforms.colorTop.value.lerp(tgtTop.current, LERP);
    uniforms.colorBottom.value.lerp(tgtBottom.current, LERP);
  });

  return (
    <mesh renderOrder={-1} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
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
