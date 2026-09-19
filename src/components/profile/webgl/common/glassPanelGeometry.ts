import * as THREE from "three";

/**
 * 유리 패널의 지오메트리와 재질.
 *
 * 투과 재질(`MeshTransmissionMaterial`, `transmission` physical)을 쓰지 마라.
 * 인스턴스마다 배경을 다시 렌더해서, 열 몇 장 띄우면 그 비용을 열 몇 배로 문다.
 * 유리로 보이게 하는 건 굴절이 아니라 가장자리가 밝아지는 것이라 프레넬이면 된다.
 */

/** 압출의 재료가 되는 단면. */
const roundedRectShape = (width: number, height: number, radius: number) => {
  const w = width / 2;
  const h = height / 2;
  // 변의 절반을 넘으면 경로가 스스로를 파고들어 면이 뒤집힌다.
  const r = Math.min(radius, w, h);

  const shape = new THREE.Shape();
  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.absarc(w - r, -h + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(w, h - r);
  shape.absarc(w - r, h - r, r, 0, Math.PI / 2, false);
  shape.lineTo(-w + r, h);
  shape.absarc(-w + r, h - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-w, -h + r);
  shape.absarc(-w + r, -h + r, r, Math.PI, Math.PI * 1.5, false);

  return shape;
};

export type PanelGeometryOptions = {
  width: number;
  height: number;
  /** 베벨이 더 붙으므로 실제 두께는 이보다 두껍다. */
  thickness: number;
  radius: number;
  /** 이 띠가 빛을 받아 보더로 읽힌다. */
  bevel: number;
};

/**
 * 보더를 따로 된 링 메쉬로 만들지 마라. 베벨 면은 노멀이 판 바깥을 향해
 * 어느 각도에서도 시선과 거의 수직이라, 프레넬이 그 띠만 밝히면 그게 보더다.
 */
export const createPanelGeometry = ({
  width,
  height,
  thickness,
  radius,
  bevel,
}: PanelGeometryOptions) => {
  const shape = roundedRectShape(width, height, radius);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
    curveSegments: 12,
    steps: 1,
  });

  // 압출은 z=0 에서 +z 로 자란다. 안 하면 기준점이 뒷면이 된다.
  geometry.center();

  return geometry;
};

/** 압출 결과의 실제 두께. */
export const panelDepth = (thickness: number, bevel: number) => thickness + bevel * 2;

const vertexShader = /* glsl */ `
  varying vec3 vNormalV;
  varying vec3 vViewDirV;
  varying vec3 vLocal;

  void main() {
    vLocal = position;
    vNormalV = normalize(normalMatrix * normal);

    vec4 mv = modelViewMatrix * vec4(position, 1.0);

    // 직교는 시선이 평행하다. 원근처럼 정점→카메라 벡터를 쓰면 가장자리
    // 프레넬이 한쪽으로 쏠린다. 투영 행렬 [3][3] 이 직교면 1, 원근이면 0.
    float isOrtho = step(0.5, projectionMatrix[3][3]);
    vViewDirV = mix(normalize(-mv.xyz), vec3(0.0, 0.0, 1.0), isOrtho);

    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uTint;
  uniform vec3 uRimColor;
  uniform float uOpacity;
  uniform float uRimPower;
  uniform float uRimStrength;
  uniform float uSheen;
  uniform vec2 uSize;

  varying vec3 vNormalV;
  varying vec3 vViewDirV;
  varying vec3 vLocal;

  void main() {
    vec3 n = normalize(vNormalV);
    vec3 v = normalize(vViewDirV);

    // 뒷면은 노멀이 반대로 온다.
    if (!gl_FrontFacing) n = -n;

    float fresnel = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), uRimPower);
    fresnel *= uRimStrength;

    // vUv 를 쓰지 마라. 압출의 앞뒤 면 UV 는 0~1 이 아니라 도형 좌표
    // 그대로라 크기가 다른 판끼리 띠 위치가 어긋난다.
    vec2 g = vLocal.xy / uSize;
    float sheen = smoothstep(0.35, -0.35, g.x - g.y) * uSheen;

    vec3 color = uTint + uRimColor * fresnel + uRimColor * sheen * 0.5;
    float alpha = clamp(uOpacity + fresnel + sheen * 0.35, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export type GlassMaterialOptions = {
  tint: THREE.ColorRepresentation;
  rimColor: THREE.ColorRepresentation;
  /** 정면 기준. 가장자리는 프레넬이 따로 올린다. */
  opacity: number;
  /** 클수록 빛나는 띠가 가장자리에 얇게 몰린다. */
  rimPower: number;
  rimStrength: number;
  sheen: number;
  width: number;
  height: number;
};

export const createGlassMaterial = ({
  tint,
  rimColor,
  opacity,
  rimPower,
  rimStrength,
  sheen,
  width,
  height,
}: GlassMaterialOptions) =>
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    // 깊이를 쓰면 먼저 그려진 판이 뒤 판을 잘라내 겹친 자리가 구멍이 된다.
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uTint: { value: new THREE.Color(tint) },
      uRimColor: { value: new THREE.Color(rimColor) },
      uOpacity: { value: opacity },
      uRimPower: { value: rimPower },
      uRimStrength: { value: rimStrength },
      uSheen: { value: sheen },
      uSize: { value: new THREE.Vector2(width, height) },
    },
  });
