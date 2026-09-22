import {
  CAMERA,
  DEFAULT_ELEVATION,
  ISO_AZIMUTH,
} from "@/components/profile/constants/sceneConfig";
import { CITY_VIEW_HEIGHT } from "@/components/profile/constants/zoomStages";
import type { GlassPanelContent } from "@/components/profile/webgl/common/GlassPanel";

/** 씬 본체와 배치 편집기가 같은 데이터를 봐야 해서 따로 뒀다. */

// 판을 카메라 쪽으로 돌리지 마라. 법선이 한 점을 향해 모여서 방 모서리가
// 아니라 카메라를 빙 둘러선 것처럼 보인다. 앞뒤로 젖히지도 마라.
export const AXIS_ROTATION = {
  /** 법선 +Z. 화면에서 오른쪽 아래로 물러난다. */
  z: [0, 0, 0] as [number, number, number],
  /** 법선 +X. 화면에서 왼쪽 아래로 물러난다. */
  x: [0, Math.PI / 2, 0] as [number, number, number],
};

export type PanelAxis = keyof typeof AXIS_ROTATION;

/**
 * 자리에서 축을 뽑는다. 손으로 적지 마라 — +X 법선은 판이 x<0 일 때만
 * 안쪽을 봐서, 조금만 옮겨도 판 하나가 슬쩍 바깥으로 돌아선다.
 *
 * x>0 이고 z>0 인 자리(카메라 쪽 모서리)에는 답이 없다. 비워 둬야 한다.
 */
export const axisFor = (
  world: readonly [number, number, number]
): PanelAxis => {
  const x = world[0] - CAMERA.target[0];
  const z = world[2] - CAMERA.target[2];
  return x < z ? "x" : "z";
};

// 자리는 화면 기준(right / up / depth)으로 적고 월드로 옮긴다.
//
// 세 축은 카메라의 화면축이어야 한다. up 을 월드 Y 로, depth 를 수평
// 방향으로 두면 카메라가 기울어 있어서 depth 를 만질 때마다 세로 위치가
// 같이 흔들린다.
//
// 이 씬이 줌축에 얹히면서 직교가 됐다. 직교에는 원근이 없으므로 depth 는
// 크기에도 화면 자리에도 영향을 주지 않는다. 이제 앞뒤(가림 순서)만 정한다.
const ELEVATION_RAD = (DEFAULT_ELEVATION * Math.PI) / 180;
const SIN_AZ = Math.sin(ISO_AZIMUTH);
const COS_AZ = Math.cos(ISO_AZIMUTH);
const SIN_EL = Math.sin(ELEVATION_RAD);
const COS_EL = Math.cos(ELEVATION_RAD);

const SCREEN_RIGHT = [COS_AZ, 0, -SIN_AZ] as const;
const SCREEN_UP = [-SIN_EL * SIN_AZ, COS_EL, -SIN_EL * COS_AZ] as const;
const VIEW_DIR = [COS_EL * SIN_AZ, SIN_EL, COS_EL * COS_AZ] as const;

/**
 * 적어 둔 자리는 담는 세로 22 를 화면으로 보고 잡은 값이다.
 * 도시 전경 단계는 40 을 담으므로 그만큼 펴야 화면에서 같은 구도가 된다.
 */
export const PANEL_FRAME = CITY_VIEW_HEIGHT / CAMERA.orthoViewHeight;

export const toWorld = (
  right: number,
  up: number,
  depth: number
): [number, number, number] => {
  const k = PANEL_FRAME;
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

/** `toWorld` 의 역. 편집기가 끌어 옮긴 결과를 화면 좌표로 되돌린다. */
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

  // `toWorld` 가 부풀린 만큼 되돌린다.
  const depth = dot(VIEW_DIR);
  const k = PANEL_FRAME;

  return [dot(SCREEN_RIGHT) / k, dot(SCREEN_UP) / k, depth];
};

export type Placement = {
  id: string;
  at: [right: number, up: number, depth: number];
  /** 비워 둬라. 적으면 판을 옮겼을 때 방향이 따라오지 않는다. */
  axis?: PanelAxis;
  width: number;
  height: number;
  content?: GlassPanelContent;
  /** 주면 판을 눌러 새 탭으로 연다. */
  href?: string;
  titleSize?: number;
  bodySize?: number;
};

/** 가로로 벌릴수록 세로가 긴 화면에서 먼저 잘려 나간다. */
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
    at: [-10.98, -1.19, -13.42],
    width: 6,
    height: 3.85,
    content: { kind: "image", src: `${IMG}/03.png` },
    href: "https://mr-chu-car-web.netlify.app",
  },
  {
    id: "main-left",
    at: [-5.41, 1.82, -11.54],
    width: 2.5,
    height: 4,
    content: { kind: "image", src: `${IMG}/04.png` },
  },
  {
    id: "lecture",
    at: [0.1, 0.98, -9.78],
    width: 4,
    height: 2.8,
    titleSize: 0.4,
    bodySize: 0.5,
    content: { kind: "image", src: `${IMG}/01.png` },
    href: "https://fastcampus.co.kr/story_article_interactive",
  },
  {
    id: "side-bottom",
    at: [5.59, 1.79, -13.56],
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
    width: 9,
    height: 7.02,
    content: { kind: "image", src: "/assets/img/about/mario_02.jpg" },
    href: "https://mario-dev-life.vercel.app/",
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

const num = (value: number) => Number(value.toFixed(2)).toString();

/** 편집 결과를 이 파일에 붙여 넣을 소스로. 상수와 주석은 살리지 못한다. */
export const serializePanels = (panels: Placement[]) => {
  const lines = panels.map((p) => {
    const rows = [
      `    id: ${JSON.stringify(p.id)},`,
      `    at: [${p.at.map(num).join(", ")}],`,
      `    width: ${num(p.width)},`,
      `    height: ${num(p.height)},`,
    ];
    if (p.axis) rows.push(`    axis: ${JSON.stringify(p.axis)},`);
    // 빠뜨리면 편집기로 한 번 복사해 붙이는 순간 링크가 조용히 사라진다.
    if (p.href) rows.push(`    href: ${JSON.stringify(p.href)},`);
    if (p.titleSize !== undefined)
      rows.push(`    titleSize: ${num(p.titleSize)},`);
    if (p.bodySize !== undefined)
      rows.push(`    bodySize: ${num(p.bodySize)},`);
    if (p.content) {
      // `IMG` 아래 경로만 템플릿 문자열로 되돌린다. 여는 쪽과 닫는 쪽을 따로
      // 바꾸면 밖에 있는 경로(about/…)가 여는 따옴표에 닫는 백틱이 붙어 깨진다.
      const src = JSON.stringify(p.content).replace(
        new RegExp(`"${IMG}/([^"]+)"`, "g"),
        "`${IMG}/$1`"
      );
      rows.push(`    content: ${src},`);
    }
    return `  {\n${rows.join("\n")}\n  },`;
  });

  return `export const FASTCAMPUS_PANELS: Placement[] = [\n${lines.join("\n")}\n];`;
};
