import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";

import { SeedParticles } from "@/components/profile/webgl/common/SeedParticles";
import { Seed } from "@/components/profile/webgl/object/Seed";

const SOIL_COLOR = "#4a3524";

export type SeedPlantingProps = {
  /** 씨앗이 심어질 지면 좌표. */
  position?: [number, number, number];
  /** 씨앗이 나타나는 높이. */
  startHeight?: number;
  /** 떨어지는 데 걸리는 시간(초). */
  fallDuration?: number;
  /**
   * 낙하 이징. 기본값은 가속 없이 부드럽게 내려오는 곡선이다.
   * 중력처럼 떨어뜨리려면 `power1.in`(= t²) 이나 `power2.in` 을 쓴다.
   */
  fallEase?: string;
  /** 착지 후 흙에 박히기까지 걸리는 시간(초). */
  plantDuration?: number;
  /** 바닥에서 씨앗 중심까지의 높이. 즉 모델 높이의 절반. */
  seedRadius?: number;
  /** 낙하 중 씨앗을 따라 길게 늘어지는 파티클. */
  particleCount?: number;
  /** 파티클이 씨앗 기준으로 뻗어 올라가는 높이. 꼬리 길이를 정한다. */
  particleTravelHeight?: number;
  /** 파티클 한 개의 수명(초). */
  particleDuration?: number;
  /** 파티클 시작 크기. 원본처럼 크게 시작해 작아진다. */
  particleInitialScale?: number;
  particleFinalScale?: number;
  particleColor?: THREE.ColorRepresentation;
  /** 원둘레 순서대로 등장시켜 나선을 만들지. */
  particleSwirl?: boolean;
  /** 씨앗이 박힐 흙. 씬에 보이는 지면이 없어서 기본으로 켜둔다. */
  showSoil?: boolean;
  soilColor?: THREE.ColorRepresentation;
  /** 다 심어졌을 때 한 번 호출된다. 꽃 피우기 연출을 붙일 자리. */
  onPlanted?: () => void;
};

/**
 * 씨앗이 파티클과 함께 떨어져 흙에 심어지는 연출.
 *
 *   낙하(파티클 동반) → 착지 스쿼시 → 흙에 박힘 → onPlanted
 *
 * 타이밍은 gsap 타임라인이 잡는다. 순차 + 겹침이 섞인 시퀀스라
 * useFrame 에서 경과 시간을 직접 나누는 것보다 읽기 쉽다.
 * (파티클 자체의 반복 애니메이션은 계속 useFrame 이 돌린다.)
 *
 * 파티클은 낙하 그룹의 자식이라 같이 내려오면서 위로 뻗어 일자로 긴 꼬리를 만든다.
 * 착지 스쿼시는 씨앗만 감싼 안쪽 그룹에 걸어서 파티클로 번지지 않게 한다.
 * 착지하면 `loop` 가 꺼져 남은 파티클이 제 수명을 마치고 사라진다.
 */
export const SeedPlanting = ({
  position = [0, 0, 0],
  startHeight = 5,
  fallDuration = 1.5,
  fallEase = "power1.inOut",
  plantDuration = 1,
  seedRadius = 0.35,
  particleCount = 15,
  particleTravelHeight = 5,
  particleDuration = 2,
  particleInitialScale = 1,
  particleFinalScale = 0.2,
  particleColor = "#ffe082",
  particleSwirl = false,
  showSoil = true,
  soilColor = SOIL_COLOR,
  onPlanted,
}: SeedPlantingProps) => {
  // 낙하와 스쿼시를 다른 그룹으로 나눈다.
  // 한 그룹에 몰면 자식인 파티클까지 착지 스쿼시를 상속받아 같이 찌그러진다.
  const fallRef = useRef<THREE.Group>(null);
  const squashRef = useRef<THREE.Group>(null);

  // 파티클 loop 를 끄기 위해서만 리렌더한다.
  const [isFalling, setIsFalling] = useState(true);

  // 타임라인이 콜백을 클로저로 잡으므로 최신 값을 ref 로 들고 있는다.
  const onPlantedRef = useRef(onPlanted);
  useEffect(() => {
    onPlantedRef.current = onPlanted;
  }, [onPlanted]);

  useEffect(() => {
    const fall = fallRef.current;
    const squash = squashRef.current;
    if (!fall || !squash) return;

    const landedY = 0.7;

    const buriedY = 0;

    fall.position.set(0, startHeight, 0);
    squash.scale.setScalar(1);
    setIsFalling(true);

    const timeline = gsap.timeline({
      onComplete: () => onPlantedRef.current?.(),
    });

    timeline.to(fall.position, {
      y: landedY,
      duration: fallDuration,
      ease: fallEase,
    });

    // 착지. 파티클은 여기서 꼬리를 끊고 남은 것만 사라지게 둔다.
    timeline.add(() => setIsFalling(false));

    timeline.to(squash.rotation, {
      x: -0.05,
      duration: 1,
      ease: "power1.inOut",
    });

    timeline.to(
      fall.position,
      { y: buriedY, duration: plantDuration, ease: "power2.out" },
      "<"
    );

    return () => {
      timeline.kill();
    };
  }, [startHeight, fallDuration, fallEase, plantDuration, seedRadius]);

  return (
    <group position={position}>
      {showSoil && (
        <mesh position={[0, 0.03, 0]} receiveShadow>
          <cylinderGeometry
            args={[seedRadius * 3, seedRadius * 3.4, 0.06, 32]}
          />
          <meshStandardMaterial color={soilColor} roughness={1} metalness={0} />
        </mesh>
      )}

      {/* 낙하만 담당한다. 파티클도 같이 내려오지만 스쿼시는 받지 않는다. */}
      <group ref={fallRef} position={[0, startHeight, 0]}>
        {/* 착지 스쿼시 전용. 씨앗만 감싼다. */}
        <group ref={squashRef}>
          <Seed />
        </group>
        {/* 값은 원본 SeedParticle 그대로다. 크기를 씨앗에 비례시키면
            훨씬 작아져서 원본과 다른 모양이 된다. */}
        <SeedParticles
          count={particleCount}
          color={particleColor}
          travelHeight={particleTravelHeight}
          radius={0.05}
          duration={particleDuration}
          stagger={0.08}
          swirl={particleSwirl}
          initialScale={particleInitialScale}
          finalScale={particleFinalScale}
          maxOpacity={1}
          loop={isFalling}
        />
      </group>
    </group>
  );
};

export default SeedPlanting;
