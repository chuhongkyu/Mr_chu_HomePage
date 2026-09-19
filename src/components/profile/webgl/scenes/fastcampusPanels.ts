import {
  CAMERA,
  DEFAULT_ELEVATION,
  ISO_AZIMUTH,
  perspectiveDistance,
} from "@/components/profile/constants/sceneConfig";
import type { GlassPanelContent } from "@/components/profile/webgl/common/GlassPanel";

/**
 * 패스트캠퍼스 씬의 판 배치.
 *
 * 씬 본체와 배치 편집기가 같은 데이터를 봐야 해서 따로 뒀다. 편집기에서
 * 맞춘 값을 그대로 이 파일의 `FASTCAMPUS_PANELS` 에 붙여 넣으면 된다.
 */

// ── 판의 방향 ──────────────────────────────────────────────
//
// 판을 카메라 쪽으로 돌리지 않는다. 그러면 모든 판의 법선이 한 점을 향해
// 모여서, 카메라를 중심으로 빙 둘러선 것처럼 보인다.
//
// 대신 월드 축에 세운다. 방위각 45° 에서 보면 +Z 를 보는 판과 +X 를 보는
// 판이 직각으로 만나 방 모서리의 두 벽처럼 읽힌다. 판끼리 평행하거나
// 수직이기만 해서 줄이 딱 맞아떨어진다.
//
// 앞뒤로 젖히지도 않는다. 수직으로 세워야 세로줄이 화면에서도 수직이다.
export const AXIS_ROTATION = {
  /** 법선 +Z. 화면에서 오른쪽 아래로 물러난다. */
  z: [0, 0, 0] as [number, number, number],
  /** 법선 +X. 화면에서 왼쪽 아래로 물러난다. */
  x: [0, Math.PI / 2, 0] as [number, number, number],
};

export type PanelAxis = keyof typeof AXIS_ROTATION;

/**
 * 판이 놓인 자리로 축을 정한다.
 *
 * 축을 손으로 적으면 안 된다. 카메라가 +X +Z 쪽에 있어서 보이는 법선은
 * +X 아니면 +Z 인데, 그 법선이 안쪽을 향하는지는 판이 어디 놓였는지가
 * 정하기 때문이다. +X 법선은 판이 x<0 에 있을 때만 안쪽을 본다. 자리를
 * 조금 옮겼을 뿐인데 판 하나가 슬쩍 바깥으로 돌아서는 일이 이래서 난다.
 *
 * 더 음수인 쪽 축을 고르면 항상 안쪽이면서 카메라에도 보인다.
 *
 * 다만 x>0 이고 z>0 인 자리(카메라 쪽 모서리)에는 답이 없다. 두 법선이
 * 모두 바깥을 향한다. 그 자리는 비워 둬야 한다.
 */
export const axisFor = (
  world: readonly [number, number, number]
): PanelAxis => {
  const x = world[0] - CAMERA.target[0];
  const z = world[2] - CAMERA.target[2];
  return x < z ? "x" : "z";
};

// ── 판의 자리 ──────────────────────────────────────────────
//
// 카메라 방위각이 45° 로 고정이라, 월드 x/z 로 자리를 적으면 화면에서
// 어디로 가는지 감이 오지 않는다. 그래서 화면 기준으로 적고 월드로 옮긴다.
//   right — 화면 오른쪽, up — 화면 위, depth — 카메라 쪽(가까워진다)
//
// 세 축은 카메라의 화면축을 그대로 쓴다. up 을 월드 Y 로, depth 를 수평
// 방향으로 두면 안 된다. 카메라가 기울어 있어서 수평으로 밀린 만큼
// 화면에서는 위로 올라가기 때문이다. 그러면 depth 를 만질 때마다 세로
// 위치가 같이 흔들려서 자리를 잡을 수가 없다.
//
// 이 씬은 원근이라 depth 가 크기까지 바꾼다. 뒤로 물러난 판은 그만큼 작게,
// 화면 중심 쪽으로 당겨져 보인다.
//
// 당겨지는 것까지 그대로 두면 자리를 잡을 수가 없다. depth 를 만질 때마다
// 화면에서 좌우로 미끄러지기 때문이다. 그래서 right/up 을 미리 그 비율만큼
// 부풀려 둔다. 결과적으로 depth 는 "화면 어디에"는 건드리지 않고
// "얼마나 작게"만 정한다.
const ELEVATION_RAD = (DEFAULT_ELEVATION * Math.PI) / 180;
const SIN_AZ = Math.sin(ISO_AZIMUTH);
const COS_AZ = Math.cos(ISO_AZIMUTH);
const SIN_EL = Math.sin(ELEVATION_RAD);
const COS_EL = Math.cos(ELEVATION_RAD);

/** 화면 오른쪽. 수평이라 세로 성분이 없다. */
const SCREEN_RIGHT = [COS_AZ, 0, -SIN_AZ] as const;
/** 화면 위. 카메라가 내려다보는 만큼 뒤로 누워 있다. */
const SCREEN_UP = [-SIN_EL * SIN_AZ, COS_EL, -SIN_EL * COS_AZ] as const;
/** 타겟에서 카메라로. 이 축으로 밀면 화면에서는 움직이지 않는다. */
const VIEW_DIR = [COS_EL * SIN_AZ, SIN_EL, COS_EL * COS_AZ] as const;

/**
 * 카메라가 타겟에서 떨어진 거리.
 *
 * 원근에서는 거리가 곧 화각이라, 담을 높이에서 역산한 값을 `CameraManager`
 * 와 똑같이 쓴다. 이 씬은 `viewHeight` 를 재정의하지 않으므로 기본값이다.
 */
const CAMERA_DISTANCE = perspectiveDistance(CAMERA.orthoViewHeight, CAMERA.fov);

/** depth 만큼 물러난 판이 화면에서 줄어드는 비율의 역수. */
const spread = (depth: number) => (CAMERA_DISTANCE - depth) / CAMERA_DISTANCE;

export const toWorld = (
  right: number,
  up: number,
  depth: number
): [number, number, number] => {
  const k = spread(depth);
  const r = right * k;
  const u = up * k;

  return [
    CAMERA.target[0] +
      SCREEN_RIGHT[0] * r +
      SCREEN_UP[0] * u +
      VIEW_DIR[0] * depth,
    CAMERA.target[1] +
      SCREEN_RIGHT[1] * r +
      SCREEN_UP[1] * u +
      VIEW_DIR[1] * depth,
    CAMERA.target[2] +
      SCREEN_RIGHT[2] * r +
      SCREEN_UP[2] * u +
      VIEW_DIR[2] * depth,
  ];
};

/**
 * `toWorld` 의 역. 편집기에서 판을 끌어 옮긴 뒤 화면 좌표로 되돌릴 때 쓴다.
 *
 * 세 축이 서로 직교하는 단위 벡터라 역행렬을 구할 필요 없이 내적이면 된다.
 */
export const toScreen = (
  world: [number, number, number]
): [right: number, up: number, depth: number] => {
  const d = [
    world[0] - CAMERA.target[0],
    world[1] - CAMERA.target[1],
    world[2] - CAMERA.target[2],
  ];
  const dot = (axis: readonly number[]) =>
    axis[0] * d[0] + axis[1] * d[1] + axis[2] * d[2];

  // `toWorld` 가 부풀려 둔 만큼 되돌린다. 안 그러면 기즈모로 뒤쪽 판을
  // 끌었을 때 숫자가 실제보다 작게 찍힌다.
  const depth = dot(VIEW_DIR);
  const k = spread(depth);

  return [dot(SCREEN_RIGHT) / k, dot(SCREEN_UP) / k, depth];
};

export type Placement = {
  id: string;
  /** 화면 기준 자리. `toWorld` 의 인자와 같다. */
  at: [right: number, up: number, depth: number];
  /**
   * 어느 축에 붙여 세울지. 비우면 자리에서 `axisFor` 가 정한다.
   * 웬만하면 비워 둔다. 적어 두면 판을 옮겼을 때 따라오지 않는다.
   */
  axis?: PanelAxis;
  width: number;
  height: number;
  content?: GlassPanelContent;
  titleSize?: number;
  bodySize?: number;
};

/**
 * 좌우 무리가 붙는 자리.
 *
 * 화면에 담기는 세로는 22 유닛(`CAMERA.orthoViewHeight`)이고 가로는 화면
 * 비율을 따라간다. 가로로 벌릴수록 세로가 긴 화면에서 먼저 잘려 나간다.
 */
const COLUMN = 4.6;

const IMG = "/assets/img/fastcampus";

/**
 * 떠 있는 유리판들.
 *
 * 가운데를 비우고 좌우로 갈라 붙인다. 왼쪽은 작업 화면, 오른쪽은 글이다.
 * 흩뿌리면 시선이 어디서 시작할지 정하지 못하는데, 두 줄로 세우면 좌우를
 * 훑게 된다.
 *
 * 이미지 판의 width/height 는 원본 비율에 맞춰 뒀다. 내용물은
 * `object-fit: cover` 처럼 잘라서 채우므로, 비율이 어긋나면 그만큼
 * 잘려 나간다. 이미지를 갈아 끼울 때 크기도 같이 봐야 하는 이유다.
 *
 * 자리와 크기는 `?panels=edit` 편집기에서 맞춰 붙여 넣을 수 있다.
 *
 * 채우는 법
 *   content: { kind: "image", src: `${IMG}/03.png` }
 *   content: { kind: "text", eyebrow: "...", title: "...", body: "..." }
 *   content 없음 → 빈 유리판. 사이를 채워 깊이를 만드는 데 쓴다.
 */
export const FASTCAMPUS_PANELS: Placement[] = [
  {
    id: "part-3",
    at: [-4.51, -4.81, 1.21],
    width: 6,
    height: 3.85,
    content: { kind: "image", src: `${IMG}/03.png` },
  },
  {
    id: "main-left",
    at: [-3.07, 1.7, 3.38],
    width: 5.87,
    height: 8.8,
    content: { kind: "image", src: `${IMG}/04.png` },
  },
  {
    id: "lecture",
    at: [2.81, 2.22, 1.43],
    width: 8.4,
    height: 6.8,
    titleSize: 0.4,
    bodySize: 0.5,
    content: {
      kind: "split",
      src: `${IMG}/01.png`,
      imageSide: "bottom",
      eyebrow: "Lecture",
      title: "강의제목: 더 쉽고 편하게 만드는 3D 인터랙티브 웹 개발 :",
      body: "구현부터 최적화까지",
    },
  },
  {
    id: "side-bottom",
    at: [1.13, -1.3, -1.08],
    width: 4,
    height: 3.2,
    titleSize: 0.4,
    bodySize: 0.26,
    content: {
      kind: "text",
      eyebrow: "Experience",
      title: "대규모 프로젝트",
      body: "삼성, 롯데, 카스, 정관장의 웹·앱 프로젝트.",
    },
  },
  {
    id: "course",
    at: [-7.2, 7.4, -16],
    width: 8,
    height: 3.65,
    content: { kind: "image", src: `${IMG}/02.jpg` },
  },
  {
    id: "back-right",
    at: [7, 7.6, -14],
    width: 5.2,
    height: 2.6,
  },
  {
    id: "edge-left",
    at: [-9.8, -0.8, -1],
    width: 3.4,
    height: 4.2,
  },
  {
    id: "edge-right",
    at: [9.8, 0.6, -1],
    width: 3.4,
    height: 4.2,
  },
];

/** 소수점 끝의 0 을 지운다. 6.80 → 6.8, 3.00 → 3 */
const num = (value: number) => Number(value.toFixed(2)).toString();

/**
 * 편집한 배치를 이 파일에 붙여 넣을 수 있는 TS 소스로 바꾼다.
 *
 * `COLUMN` 같은 상수와 주석은 살리지 못한다. 자리를 맞춘 뒤 숫자만
 * 옮겨 적는 용도다.
 */
export const serializePanels = (panels: Placement[]) => {
  const lines = panels.map((p) => {
    const rows = [
      `    id: ${JSON.stringify(p.id)},`,
      `    at: [${p.at.map(num).join(", ")}],`,
      `    width: ${num(p.width)},`,
      `    height: ${num(p.height)},`,
    ];
    if (p.axis) rows.push(`    axis: ${JSON.stringify(p.axis)},`);
    if (p.titleSize !== undefined)
      rows.push(`    titleSize: ${num(p.titleSize)},`);
    if (p.bodySize !== undefined)
      rows.push(`    bodySize: ${num(p.bodySize)},`);
    if (p.content) {
      const src = JSON.stringify(p.content)
        .replace(`"${IMG}/`, "`${IMG}/")
        .replace(/\.(png|jpg|webp)"/, ".$1`");
      rows.push(`    content: ${src},`);
    }
    return `  {\n${rows.join("\n")}\n  },`;
  });

  return `export const FASTCAMPUS_PANELS: Placement[] = [\n${lines.join("\n")}\n];`;
};
