import { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import type { Line2 } from "three-stdlib";

import { drawLabel, type LabelTexture } from "@/components/profile/webgl/common/canvasText";

/** 격자와 같은 높이면 지글거린다. */
const LIFT = 0.02;

const LABEL_LIFT = 0.04;
const LABEL_GAP = 0.8;
const PULSE_SECONDS = 2.6;
const LINE_OPACITY = 0.9;
const FADE_SECONDS = 0.8;

export type ExportTraceProps = {
  /** 캐릭터 발밑을 원점으로 한 [x, z] 점들. */
  path: readonly (readonly [number, number])[];
  label: string;
  color: string;
  labelSize?: number;
  delay?: number;
  fadeDelay?: number;
};

/**
 * 캐릭터에서 뻗어 나가 플랫폼 이름에 닿는 한 줄.
 *
 * 글자 방향은 경로를 따라가면 안 된다. 월드 -X 나 +Z 로 누우면 화면에서
 * 오른쪽→왼쪽으로 읽히게 뒤집힌다. 전부 +X 로 통일한다.
 */
export const ExportTrace = ({
  path,
  label,
  color,
  labelSize = 0.85,
  delay = 0,
  fadeDelay = 0,
}: ExportTraceProps) => {
  const points = useMemo(
    () => path.map(([x, z]) => new THREE.Vector3(x, LIFT, z)),
    [path]
  );

  /** 신호를 일정한 속도로 보내려면 누적 길이가 필요하다. */
  const lengths = useMemo(() => {
    const out = [0];
    for (let i = 1; i < points.length; i += 1) {
      out.push(out[i - 1] + points[i].distanceTo(points[i - 1]));
    }
    return out;
  }, [points]);

  const total = lengths[lengths.length - 1];
  const pulse = useRef<THREE.Mesh>(null);
  const line = useRef<Line2>(null);
  const labelMaterial = useRef<THREE.MeshBasicMaterial>(null);

  /** 리액트 상태로 두지 마라. 쓰는 곳이 전부 three 재질이라 헛 렌더만 난다. */
  const appear = useRef({ v: 0 });

  useEffect(() => {
    appear.current.v = 0;
    const tween = gsap.to(appear.current, {
      v: 1,
      duration: FADE_SECONDS,
      delay: fadeDelay,
      ease: "power2.out",
    });

    return () => {
      tween.kill();
    };
  }, [fadeDelay]);

  useFrame(({ clock }) => {
    const shown = appear.current.v;

    if (line.current) line.current.material.opacity = LINE_OPACITY * shown;
    if (labelMaterial.current) labelMaterial.current.opacity = shown;
    if (pulse.current) pulse.current.scale.setScalar(shown);

    if (!pulse.current || total === 0) return;

    const t =
      (((clock.elapsedTime + delay) % PULSE_SECONDS) / PULSE_SECONDS) * total;

    let i = 1;
    while (i < lengths.length - 1 && lengths[i] < t) i += 1;

    const span = lengths[i] - lengths[i - 1];
    const k = span === 0 ? 0 : (t - lengths[i - 1]) / span;
    pulse.current.position.lerpVectors(points[i - 1], points[i], k);
  });

  const [labelTexture, setLabelTexture] = useState<LabelTexture | null>(null);

  useEffect(() => {
    let current: LabelTexture | null = null;
    let alive = true;

    const paint = () => {
      if (!alive) return;
      const next = drawLabel({ text: label, color, size: labelSize });
      if (!next) return;
      current?.texture.dispose();
      current = next;
      setLabelTexture(next);
    };

    paint();
    // 웹폰트가 늦게 붙으면 첫 그림은 대체 폰트로 나간다. 준비되면 다시 굽는다.
    document.fonts?.ready.then(paint).catch(() => {});

    return () => {
      alive = false;
      current?.texture.dispose();
    };
  }, [label, color, labelSize]);

  /**
   * 틈만큼만 밀면 글자 절반이 선 위로 올라탄다. 글자가 그 방향으로 차지하는
   * 길이의 절반까지 더 밀어야 앞면과 선 끝 사이가 `LABEL_GAP` 이 된다.
   */
  const labelPosition = useMemo(() => {
    const end = points[points.length - 1];
    if (!labelTexture || points.length < 2) return end;

    const dir = end.clone().sub(points[points.length - 2]).normalize();
    const extent =
      Math.abs(dir.x) * labelTexture.width + Math.abs(dir.z) * labelTexture.height;

    return end.clone().addScaledVector(dir, LABEL_GAP + extent / 2);
  }, [points, labelTexture]);

  return (
    <>
      <Line
        ref={line}
        points={points}
        color={color}
        lineWidth={2.4}
        transparent
        opacity={LINE_OPACITY}
      />

      <mesh ref={pulse} scale={0}>
        <sphereGeometry args={[0.14, 12, 8]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

      {labelTexture && (
        <mesh
          position={[labelPosition.x, LABEL_LIFT, labelPosition.z]}
          rotation={[-Math.PI / 2, 0, 0]}
          renderOrder={1}
        >
          <planeGeometry args={[labelTexture.width, labelTexture.height]} />
          <meshBasicMaterial
            ref={labelMaterial}
            map={labelTexture.texture}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}
    </>
  );
};

export default ExportTrace;
