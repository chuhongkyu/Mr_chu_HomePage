import { useEffect, useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";

import {
  createParticleMaterial,
  PARTICLE_CIRCLE_TEXTURE,
  toSRGB,
} from "@/components/profile/webgl/common/particles";

/** 페이드 인이 끝나는 지점과 페이드 아웃이 시작되는 지점 (수명 대비 비율). */
const FADE_IN_RATIO = 0.15;
const FADE_OUT_START_RATIO = 0.6;
const FADE_OUT_RATIO = 0.4;

/** 수명 동안 옆으로 흔들리는 폭. 원본의 `(Math.random() - 0.5) * 1.5`. */
const DRIFT_RANGE = 1.5;

export type SeedParticlesProps = {
  count?: number;
  color?: THREE.ColorRepresentation;
  /**
   * 파티클이 도달할 y. 원점(y=0)에서 출발해 여기까지 이동한다.
   * 음수를 주면 아래로 떨어진다.
   */
  travelHeight?: number;
  /** 파티클이 놓이는 원의 반지름. */
  radius?: number;
  /** 한 파티클이 이동해 사라지기까지 걸리는 시간(초). */
  duration?: number;
  /** 파티클 사이의 시간차(초). 0 이면 한꺼번에 터진다. */
  stagger?: number;
  /**
   * 등장 순서를 원둘레 순서와 맞출지.
   *
   * 켜면 원을 따라 순서대로 나타나 나선처럼 도는 모양이 된다(원본 동작).
   * 끄면 순서를 섞어서 돌지 않고 곧게 뻗는다.
   */
  swirl?: boolean;
  /** 시작 크기. 원본은 크게 시작해서 작아진다. */
  initialScale?: number;
  finalScale?: number;
  maxOpacity?: number;
  /** 사라진 파티클을 다시 띄운다. */
  loop?: boolean;
  position?: [number, number, number];
};

/**
 * 원 위에 둘러선 스프라이트가 시간차를 두고 이동하며 사라지는 파티클.
 *
 * 타임라인 구성은 참고한 원본(당근이네 씨앗 이펙트)과 같다.
 * 파티클 하나당 gsap 타임라인 하나를 만들고, 위치·크기·투명도를 겹쳐서 돌린다.
 *
 *   position  0 → travelHeight        power1.out
 *   scale     initialScale → finalScale  power2.out
 *   opacity   0 → max (수명의 15%)     power2.in
 *   opacity   max → 0 (60% 지점부터)   power2.out
 *
 * 원본은 `y` 를 0 → +10 으로 **올린다**. 크게 시작해 작아지기 때문에
 * 멀어지는 것처럼 보인다. 실제로 떨어뜨리려면 `travelHeight` 에 음수를 준다.
 */
export const SeedParticles = ({
  count = 15,
  color = "#ffe082",
  travelHeight = 10,
  radius = 0.5,
  duration = 2,
  stagger = 0.08,
  swirl = true,
  initialScale = 4,
  finalScale = 0.2,
  maxOpacity = 1,
  loop = true,
  position = [0, 0, 0],
}: SeedParticlesProps) => {
  const texture = useTexture(PARTICLE_CIRCLE_TEXTURE, toSRGB);
  const timelines = useRef<gsap.core.Timeline[]>([]);

  const { group, sprites } = useMemo(() => {
    const root = new THREE.Group();
    const created: THREE.Sprite[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const sprite = new THREE.Sprite(createParticleMaterial(texture, color));

      sprite.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      sprite.scale.setScalar(initialScale);
      root.add(sprite);
      created.push(sprite);
    }

    return { group: root, sprites: created };
  }, [count, color, radius, initialScale, texture]);

  useEffect(() => {
    // 등장 순서. 원둘레 순서와 같으면 나선이 생기므로 swirl 을 끄면 섞는다.
    const order = Array.from({ length: count }, (_, i) => i);
    if (!swirl) {
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
    }

    timelines.current = sprites.map((sprite, i) => {
      const { x, z } = sprite.position;
      const material = sprite.material as THREE.SpriteMaterial;

      // 반복 재생 때 값이 누적되지 않도록 `to` 가 아니라 `fromTo` 로 시작점을 고정한다.
      const timeline = gsap.timeline({ delay: order[i] * stagger, repeat: -1 });

      timeline.fromTo(
        sprite.position,
        { x, y: 0, z },
        {
          x: x + (Math.random() - 0.5) * DRIFT_RANGE,
          y: travelHeight,
          z: z + (Math.random() - 0.5) * DRIFT_RANGE,
          duration,
          ease: "power1.out",
        },
        0
      );

      timeline.fromTo(
        sprite.scale,
        { x: initialScale, y: initialScale, z: initialScale },
        {
          x: finalScale,
          y: finalScale,
          z: finalScale,
          duration,
          ease: "power2.out",
        },
        0
      );

      timeline.fromTo(
        material,
        { opacity: 0 },
        {
          opacity: maxOpacity,
          duration: duration * FADE_IN_RATIO,
          ease: "power2.in",
        },
        0
      );

      timeline.to(
        material,
        {
          opacity: 0,
          duration: duration * FADE_OUT_RATIO,
          ease: "power2.out",
        },
        duration * FADE_OUT_START_RATIO
      );

      return timeline;
    });

    const created = timelines.current;
    return () => {
      created.forEach((timeline) => timeline.kill());
    };
  }, [
    sprites,
    count,
    swirl,
    stagger,
    travelHeight,
    duration,
    initialScale,
    finalScale,
    maxOpacity,
  ]);

  // 재생 중에 loop 를 끄면 남은 파티클이 현재 회차를 마치고 멈춘다.
  // 타임라인을 죽이면 그 자리에서 툭 사라지므로 repeat 만 바꾼다.
  useEffect(() => {
    timelines.current.forEach((timeline) => timeline.repeat(loop ? -1 : 0));
  }, [loop]);

  // 머티리얼은 파티클마다 새로 만드니 직접 정리한다.
  // 텍스처는 drei 의 useTexture 캐시가 들고 있으므로 건드리지 않는다.
  useEffect(() => {
    return () => {
      sprites.forEach((sprite) =>
        (sprite.material as THREE.SpriteMaterial).dispose()
      );
    };
  }, [sprites]);

  return <primitive object={group} position={position} />;
};

useTexture.preload(PARTICLE_CIRCLE_TEXTURE);

export default SeedParticles;
