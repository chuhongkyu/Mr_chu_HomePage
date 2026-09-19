import * as THREE from "three";

/**
 * 두 파티클 이펙트가 공유하는 원형 스프라이트.
 * 알파를 가진 소프트 화이트라 additive blending 으로 색을 입히기 좋다.
 */
export const PARTICLE_CIRCLE_TEXTURE = "/assets/img/circle_ui.png";

// 참고 구현이 쓰던 gsap 이징과 같은 곡선.
// 이 저장소는 gsap 을 의존성에 두지 않으므로 useFrame 에서 직접 계산한다.
export const easeInQuad = (t: number) => t ** 2; // power1.in — 중력 낙하에 쓴다
export const easeOutQuad = (t: number) => 1 - (1 - t) ** 2; // power1.out
export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3; // power2.out
export const easeInCubic = (t: number) => t ** 3; // power2.in

export type FadeEnvelope = {
  maxOpacity: number;
  /** 페이드 인이 끝나는 진행률(0~1). */
  fadeInEnd: number;
  /** 페이드 아웃이 시작되는 진행률(0~1). */
  fadeOutStart: number;
};

/** 0 → maxOpacity → 유지 → 0 으로 이어지는 수명 전체의 투명도 곡선. */
export const fadeOpacity = (
  t: number,
  { maxOpacity, fadeInEnd, fadeOutStart }: FadeEnvelope
) => {
  if (t < fadeInEnd) return maxOpacity * easeInCubic(t / fadeInEnd);
  if (t < fadeOutStart) return maxOpacity;
  return (
    maxOpacity * (1 - easeOutCubic((t - fadeOutStart) / (1 - fadeOutStart)))
  );
};

/**
 * 파티클용 SpriteMaterial.
 * 투명도를 개별로 제어해야 해서 스프라이트마다 새로 만든다. 정리는 호출부 책임.
 */
export const createParticleMaterial = (
  map: THREE.Texture,
  color: THREE.ColorRepresentation
) =>
  new THREE.SpriteMaterial({
    map,
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

/**
 * drei 의 useTexture 콜백에서 쓴다.
 * three r152+ 의 TextureLoader 기본값이 NoColorSpace 라, 지정하지 않으면
 * 컬러 틴트가 어둡게 나온다.
 */
export const toSRGB = (texture: THREE.Texture | THREE.Texture[]) => {
  (Array.isArray(texture) ? texture : [texture]).forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });
};
