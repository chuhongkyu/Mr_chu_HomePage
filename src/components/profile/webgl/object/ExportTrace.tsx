import { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import type { Line2 } from "three-stdlib";

import { drawLabel, type LabelTexture } from "@/components/profile/webgl/common/canvasText";

/** 선을 바닥에서 살짝 띄운다. 격자와 같은 높이면 서로 지글거린다. */
const LIFT = 0.02;

/** 글자는 선보다 조금 더 띄운다. 선 위를 지나가도 묻히지 않는다. */
const LABEL_LIFT = 0.04;

/** 선 끝과 글자 사이의 틈(월드 유닛). 글자가 선에 매달린 듯 붙지 않게 한다. */
const LABEL_GAP = 0.8;

/** 신호가 한 번 훑고 지나가는 데 걸리는 시간(초). */
const PULSE_SECONDS = 2.6;

/** 선이 다 보일 때의 진하기. 페이드인은 여기에 비율로 얹힌다. */
const LINE_OPACITY = 0.9;

/** 나타나는 데 걸리는 시간(초). */
const FADE_SECONDS = 0.8;

export type ExportTraceProps = {
  /** 바닥 위 경로. 캐릭터 발밑을 원점으로 한 [x, z] 점들. */
  path: readonly (readonly [number, number])[];
  label: string;
  color: string;
  /** 글자 크기(월드 유닛). */
  labelSize?: number;
  /** 신호가 출발하는 시점을 어긋내는 값(초). 여러 줄이 같이 움직이면 기계 같다. */
  delay?: number;
  /** 씬에 들어오고 이만큼 지난 뒤에 나타난다(초). */
  fadeDelay?: number;
};

/**
 * 캐릭터에서 뻗어 나가 플랫폼 이름에 닿는 한 줄.
 *
 * 곧게 뻗지 않고 직각으로 꺾는다. 만든 모션이 여러 플랫폼으로 흘러 나가는
 * 걸 회로 기판처럼 읽히게 하려는 것이다. 곧은 선은 그냥 지시선으로 보인다.
 *
 * 글자는 바닥에 눕히되 방향은 경로를 따라가지 않는다. 카메라 방위각이 45°
 * 라 월드 -X 나 +Z 로 누운 글자는 화면에서 오른쪽에서 왼쪽으로 읽히게
 * 뒤집힌다. 그래서 전부 +X 로 통일한다.
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

  /** 각 꼭짓점까지의 누적 길이. 신호를 일정한 속도로 보내는 데 쓴다. */
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

  /**
   * 0 에서 1 로 차오르는 나타남 정도.
   *
   * 리액트 상태로 두지 않는다. 매 프레임 다시 그리게 만들 뿐이고, 어차피
   * 값을 쓰는 곳은 셋 다 three 의 재질이라 프레임 루프 안에서 직접 먹이면
   * 된다. gsap 은 값만 굴린다.
   */
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

    // 0~1 을 반복한다. 뒤에서 앞으로 한 번 훑고 처음으로 돌아간다.
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
   * 글자 자리. 선 끝에서 마지막 구간이 가던 방향으로 더 밀어낸다.
   *
   * 선 끝에 그대로 얹으면 글자 절반이 선 위로 올라타 겹친다. 틈만큼이
   * 아니라 글자가 그 방향으로 차지하는 길이의 절반까지 더 밀어야, 글자
   * 앞면과 선 끝 사이가 실제로 `LABEL_GAP` 이 된다.
   *
   * 글자는 항상 월드 +X 로 눕는다. 그래서 마지막 구간이 X 축이면 글자 폭이,
   * Z 축이면 글자 높이가 그 방향의 길이가 된다.
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

      {/* 나타나는 동안에는 크기로 줄인다. 점 하나라 투명도보다 이쪽이 눈에 낫다. */}
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
