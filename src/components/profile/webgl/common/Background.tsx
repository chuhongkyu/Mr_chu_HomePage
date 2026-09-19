import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import fragmentShader from "@/shaders/background.frag.glsl";
import vertexShader from "@/shaders/background.vert.glsl";

const LERP = 0.06;

type Props = {
  color: string;
  /**
   * 끄면 단색. 화면을 채우는 그림을 쓰는 씬은 꺼야 한다. 그림의 평평한
   * 바탕과 어긋나 그림 가장자리가 사각형으로 드러난다.
   */
  gradient?: boolean;
};

/**
 * 화면을 덮는 사각형 하나로 칠하는 씬 배경.
 *
 * 단색 씬도 이걸 거친다. `<color attach="background">` 로 칠하면 씬을 넘길 때
 * 색이 툭 바뀌는데, 그 깜빡임이 먼저 눈에 걸린다.
 */
export const Background = ({ color, gradient = false }: Props) => {
  const size = useThree((state) => state.size);

  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color(color) },
      aspect: { value: 1 },
      gradient: { value: gradient ? 1 : 0 },
    }),
    // 매 렌더 새 객체를 주면 R3F 가 갈아 끼워 옮겨 가던 중간값이 날아간다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const target = useRef(new THREE.Color(color));
  target.current.set(color);

  useFrame(() => {
    uniforms.color.value.lerp(target.current, LERP);
    uniforms.aspect.value = size.width / size.height;

    const want = gradient ? 1 : 0;
    uniforms.gradient.value += (want - uniforms.gradient.value) * LERP;
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

export default Background;
