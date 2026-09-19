import * as THREE from "three";

/**
 * 유리 패널의 지오메트리와 재질. 컴포넌트는 `GlassPanel.tsx` 에 있다.
 *
 * 투과 재질(`MeshTransmissionMaterial`, `transmission` 을 켠 physical)을 쓰지
 * 않는다. 그 둘은 인스턴스마다 배경을 다시 렌더해서 텍스처로 굽는다. 패널을
 * 열 몇 장 띄우는 구성이라 그 비용을 열 몇 배로 물게 된다.
 *
 * 대신 굴절을 포기하고 프레넬로 흉내 낸다. 유리처럼 보이게 하는 건 사실
 * 굴절이 아니라 가장자리가 밝아지는 것이라, 배경이 단색인 이 씬에서는
 * 차이가 거의 드러나지 않는다.
 */

/** 모서리를 둥글린 사각형 단면. 압출의 재료가 된다. */
const roundedRectShape = (width: number, height: number, radius: number) => {
  const w = width / 2;
  const h = height / 2;
  // 반지름이 변의 절반을 넘으면 경로가 스스로를 파고들어 면이 뒤집힌다.
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
  /** 판의 두께. 베벨이 여기에 더 붙으므로 실제 두께는 이보다 조금 두껍다. */
  thickness: number;
  /** 모서리 둥글기. */
  radius: number;
  /** 앞뒤 면을 깎아낸 폭. 이 띠가 빛을 받아 보더로 읽힌다. */
  bevel: number;
};

/**
 * 베벨을 준 판.
 *
 * 보더를 따로 된 링 메쉬로 만들지 않는다. 압출의 베벨 면은 노멀이 판 바깥을
 * 향하므로 어느 각도에서 봐도 시선과 거의 수직이고, 그래서 프레넬 값이 1 에
 * 가깝게 나온다. 셰이더가 그 띠만 밝히면 그게 곧 보더다. 메쉬가 하나로
 * 끝나고, 두께·둥글기를 바꿔도 보더가 따라온다.
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

  // 압출은 z=0 에서 +z 로 자라난다. 그대로 두면 판의 기준점이 뒷면이라
  // position 을 줄 때마다 두께의 절반을 손으로 빼야 한다.
  geometry.center();

  return geometry;
};

/** 압출 결과의 실제 두께. 내용물을 앞면에 붙일 때 필요하다. */
export const panelDepth = (thickness: number, bevel: number) => thickness + bevel * 2;

const vertexShader = /* glsl */ `
  varying vec3 vNormalV;
  varying vec3 vViewDirV;
  varying vec3 vLocal;

  void main() {
    vLocal = position;
    vNormalV = normalize(normalMatrix * normal);

    vec4 mv = modelViewMatrix * vec4(position, 1.0);

    // 직교 카메라는 시선이 화면 전체에서 평행하다. 원근처럼 정점에서
    // 카메라로 향하는 벡터를 쓰면 가장자리 프레넬이 한쪽으로 쏠린다.
    // 투영 행렬의 [3][3] 이 직교면 1, 원근이면 0 이라 그걸로 가른다.
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

    // 뒷면은 노멀이 반대로 온다. 뒤집어 줘야 뒷면의 프레넬도 앞면과 같게 나온다.
    if (!gl_FrontFacing) n = -n;

    float fresnel = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), uRimPower);
    fresnel *= uRimStrength;

    // 판을 가로지르는 완만한 대각 띠. 유리가 빛을 흘리는 느낌만 준다.
    // vUv 를 안 쓴다. 압출 지오메트리의 앞뒤 면 UV 는 0~1 이 아니라 도형
    // 좌표 그대로라 크기가 다른 패널끼리 띠 위치가 어긋난다.
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
  /** 유리 몸통 색. 배경 위에 얇게 얹히는 톤이다. */
  tint: THREE.ColorRepresentation;
  /** 가장자리에 도는 빛의 색. */
  rimColor: THREE.ColorRepresentation;
  /** 정면에서 봤을 때의 불투명도. 가장자리는 프레넬이 따로 올린다. */
  opacity: number;
  /** 클수록 빛나는 띠가 가장자리에 얇게 몰린다. */
  rimPower: number;
  rimStrength: number;
  /** 대각 하이라이트 세기. 0 이면 끈다. */
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
    // 투명한 판이 여러 장 겹친다. 깊이를 쓰면 먼저 그려진 판이 뒤에 있는
    // 판을 잘라내서, 겹친 자리가 유리가 아니라 구멍으로 보인다.
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
