import { useEffect, useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  createParticleMaterial,
  easeOutCubic,
  easeOutQuad,
  fadeOpacity,
  PARTICLE_CIRCLE_TEXTURE,
  toSRGB,
} from "@/components/profile/webgl/common/particles";

const DEFAULT_COLORS = [
  "#ffd700",
  "#ff69b4",
  "#00ced1",
  "#ff6347",
  "#9370db",
  "#32cd32",
];

/** 페이드 인이 끝나는 지점과 페이드 아웃이 시작되는 지점 (진행률 0~1 기준). */
const FADE_IN_END = 0.15;
const FADE_OUT_START = 0.6;

export type RainbowEnergyParticlesProps = {
  count?: number;
  colors?: string[];
  /** 파티클이 흩어지는 원기둥의 반지름. */
  radius?: number;
  /** 파티클이 처음 뿌려지는 높이 범위. */
  columnHeight?: number;
  /** 한 번 솟아올랐다 사라지기까지 걸리는 시간(초). */
  duration?: number;
  initialScale?: number;
  finalScale?: number;
  maxOpacity?: number;
  /**
   * 사라진 파티클을 다시 띄운다.
   * 각 파티클의 시작 위상이 달라서 끊기지 않고 이어진다.
   */
  loop?: boolean;
  position?: [number, number, number];
};

type Particle = {
  sprite: THREE.Sprite;
  material: THREE.SpriteMaterial;
  origin: THREE.Vector3;
  /** 수명 동안 이동할 변위. y 는 상승, x/z 는 옆으로 흔들리는 양. */
  drift: THREE.Vector3;
  elapsed: number;
};

/**
 * 원형 스프라이트가 무지개색으로 솟아오르며 사라지는 에너지 파티클.
 *
 * 스프라이트마다 자기 머티리얼을 들고 있어서 개별로 색과 투명도를 제어한다.
 * `count` 만큼 드로우콜이 늘어나므로 수십 개 규모를 전제로 한다.
 */
export const RainbowEnergyParticles = ({
  count = 20,
  colors = DEFAULT_COLORS,
  radius = 1,
  columnHeight = 10,
  duration = 1.5,
  initialScale = 1,
  finalScale = 2,
  maxOpacity = 0.5,
  loop = true,
  position = [0, 0, 0],
}: RainbowEnergyParticlesProps) => {
  const texture = useTexture(PARTICLE_CIRCLE_TEXTURE, toSRGB);

  const { group, particles } = useMemo(() => {
    const root = new THREE.Group();
    const created: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const spread = radius * (0.5 + Math.random() * 0.5);

      const material = createParticleMaterial(
        texture,
        colors[i % colors.length]
      );
      const sprite = new THREE.Sprite(material);
      const origin = new THREE.Vector3(
        Math.cos(angle) * spread,
        Math.random() * columnHeight,
        Math.sin(angle) * spread
      );

      sprite.position.copy(origin);
      sprite.scale.setScalar(initialScale);
      root.add(sprite);

      created.push({
        sprite,
        material,
        origin,
        drift: new THREE.Vector3(
          (Math.random() - 0.5) * 1.5,
          3 + Math.random() * 5,
          (Math.random() - 0.5) * 1.5
        ),
        // 음수에서 시작하면 그만큼 늦게 등장한다. 한꺼번에 터지지 않게 흩는다.
        elapsed: -Math.random() * duration,
      });
    }

    return { group: root, particles: created };
    // loop 은 의존성에 넣지 않는다. 넣으면 재생 중에 loop 을 끄는 순간
    // 파티클이 전부 새로 만들어지면서 위치가 튄다.
  }, [count, colors, radius, columnHeight, duration, initialScale, texture]);

  useFrame((_, delta) => {
    for (const particle of particles) {
      particle.elapsed += delta;

      if (particle.elapsed < 0) {
        particle.material.opacity = 0;
        continue;
      }

      if (particle.elapsed > duration) {
        if (!loop) {
          particle.material.opacity = 0;
          continue;
        }
        particle.elapsed -= duration;
      }

      const t = particle.elapsed / duration;

      const rise = easeOutQuad(t);
      particle.sprite.position.set(
        particle.origin.x + particle.drift.x * rise,
        particle.origin.y + particle.drift.y * rise,
        particle.origin.z + particle.drift.z * rise
      );

      particle.sprite.scale.setScalar(
        initialScale + (finalScale - initialScale) * easeOutCubic(t)
      );

      particle.material.opacity = fadeOpacity(t, {
        maxOpacity,
        fadeInEnd: FADE_IN_END,
        fadeOutStart: FADE_OUT_START,
      });
    }
  });

  // 머티리얼은 파티클마다 새로 만드니 직접 정리한다.
  // 텍스처는 drei 의 useTexture 캐시가 들고 있으므로 건드리지 않는다.
  useEffect(() => {
    return () => {
      particles.forEach((particle) => particle.material.dispose());
    };
  }, [particles]);

  return <primitive object={group} position={position} />;
};

useTexture.preload(PARTICLE_CIRCLE_TEXTURE);

export default RainbowEnergyParticles;
