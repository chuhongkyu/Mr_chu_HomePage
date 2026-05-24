import { useRef, useEffect } from "react";
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
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const curTop = useRef(new THREE.Color(DEFAULT_THEME.colorTop));
  const curBottom = useRef(new THREE.Color(DEFAULT_THEME.colorBottom));
  const tgtTop = useRef(new THREE.Color(DEFAULT_THEME.colorTop));
  const tgtBottom = useRef(new THREE.Color(DEFAULT_THEME.colorBottom));

  // useFrame 클로저 문제 우회: store를 직접 구독
  useEffect(() => {
    return usePlayerStore.subscribe((state) => {
      tgtTop.current.set(state.theme.colorTop);
      tgtBottom.current.set(state.theme.colorBottom);
    });
  }, []);

  useFrame(() => {
    if (!matRef.current) return;
    curTop.current.lerp(tgtTop.current, LERP);
    curBottom.current.lerp(tgtBottom.current, LERP);
    matRef.current.uniforms.colorTop.value.copy(curTop.current);
    matRef.current.uniforms.colorBottom.value.copy(curBottom.current);
  });

  return (
    <mesh renderOrder={-1} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
        uniforms={{
          colorTop: { value: curTop.current.clone() },
          colorBottom: { value: curBottom.current.clone() },
        }}
      />
    </mesh>
  );
};
