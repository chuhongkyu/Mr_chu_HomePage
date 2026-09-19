import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import fragmentShader from "@/shaders/background.frag.glsl";
import vertexShader from "@/shaders/background.vert.glsl";

/** 씬이 바뀔 때 색이 옮겨 가는 속도. 클수록 빨리 갈아탄다. */
const LERP = 0.06;

type Props = {
  /** 씬의 바탕색. 여기서 그라데이션과 비네트를 만들어 낸다. */
  color: string;
  /**
   * 끄면 `color` 단색으로 칠한다. 색이 옮겨 가는 건 그대로다.
   * 화면을 채우는 그림을 쓰는 씬은 꺼야 한다. 그림의 평평한 바탕과
   * 그라데이션이 어긋나서 그림 가장자리가 사각형으로 드러난다.
   */
  gradient?: boolean;
};

/**
 * 씬 배경.
 *
 * `<color attach="background">` 한 줄로 끝내지 않는다. 단색으로 두면 판이나
 * 오브제가 허공에 뜬 게 아니라 색종이에 붙은 것처럼 납작해 보인다.
 * 위아래 그라데이션과 비네트가 있어야 깊이가 생긴다.
 *
 * 화면을 덮는 사각형 하나다. 정점 셰이더가 클립 공간 좌표를 직접 써서
 * 카메라가 어디를 보든 화면에 꽉 찬다.
 *
 * 단색 씬에서도 이걸 쓴다. `<color attach="background">` 로 칠하면 씬을
 * 넘길 때 색이 툭 바뀌는데, 그 깜빡임이 판이 사라졌다 나타나는 것보다
 * 먼저 눈에 걸린다. 여기서는 색도 그라데이션 여부도 옮겨 간다.
 */
export const Background = ({ color, gradient = false }: Props) => {
  const size = useThree((state) => state.size);

  const uniforms = useMemo(
    () => ({
      color: { value: new THREE.Color(color) },
      aspect: { value: 1 },
      gradient: { value: gradient ? 1 : 0 },
    }),
    // 처음 한 번만 만든다. 매 렌더 새 객체를 주면 R3F 가 통째로 갈아 끼워
    // 색이 옮겨 가던 중간값이 날아간다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const target = useRef(new THREE.Color(color));
  target.current.set(color);

  useFrame(() => {
    uniforms.color.value.lerp(target.current, LERP);
    uniforms.aspect.value = size.width / size.height;

    // 그라데이션도 같이 옮겨 간다. 단색 씬에서 그라데이션 씬으로 넘어갈 때
    // 색만 따라가고 모양이 즉시 붙으면 그 순간이 따로 논다.
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
