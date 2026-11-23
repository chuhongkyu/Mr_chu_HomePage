/**
 * 사이트 정본 주소.
 *
 * 한 곳에서만 적는다. 사이트맵·robots·메타데이터가 제각각 다른 호스트를
 * 가리키면 구글이 같은 글을 두 사이트로 보고 신호를 나눠 가진다. 실제로
 * vercel 기본 도메인이 적혀 있어서 그렇게 돌고 있었다.
 *
 * **`www` 를 빼지 마라.** 200 을 돌려주는 건 `www` 쪽이고 `mrchu.art` 는
 * 307 로 거기로 넘긴다. `www` 가 없으면 사이트맵의 모든 주소가 리디렉션이
 * 되고, canonical 도 자기 자신이 아니라 넘어가는 주소를 가리킨다. 그 상태로
 * Search Console 에 "발견됨 - 현재 색인이 생성되지 않음" 이 쌓였다.
 */
export const SITE_URL = "https://www.mrchu.art";

export const SITE_NAME = "MR.CHU";

/** 공유 카드에 쓰는 대표 이미지. 페이지마다 따로 적지 않는다. */
export const OG_IMAGE = {
  url: "/assets/og_img_default.jpg",
  width: 1200,
  height: 630,
  alt: "FE MR.CHU",
} as const;

export const AUTHOR = {
  name: "추홍규",
  alternateName: "MR.CHU",
  jobTitle: "Creative Frontend Developer",
} as const;

/**
 * 이 사람을 부르는 다른 이름들. 영문 표기는 순서가 두 가지로 섞여 쓰인다.
 * 검색은 이 중 무엇으로 들어와도 같은 사람에 닿아야 한다.
 */
export const AUTHOR_NAMES = ["MR.CHU", "Hongkyu Chu", "Chu Hongkyu"];

/**
 * 다른 곳에 있는 내 프로필. 구글이 "추홍규" 라는 이름을 이 사이트와 같은
 * 사람으로 묶는 근거다. 저쪽에서도 이 사이트를 가리켜야 연결이 단단해진다.
 */
export const SAME_AS = [
  "https://github.com/chuhongkyu",
  "https://www.linkedin.com/in/hong-kyu-chu-a38b9a249",
];

/**
 * 홈의 제목과 설명. 이름이 앞에 와야 한다 — "추홍규" 검색에서 가장 크게
 * 보는 게 제목이고, 예전 `FE | MR.CHU` 에는 이름이 아예 없었다.
 */
export const HOME_TITLE = "추홍규 | MR.CHU · 프론트엔드 개발자";
export const HOME_DESCRIPTION =
  "프론트엔드 개발자 추홍규(MR.CHU)의 포트폴리오입니다. 당근마켓과 아이리브에서 웹 위의 3D 인터랙션을 만들었습니다.";

/** 절대 URL 로 만든다. OG 이미지와 canonical 은 상대경로를 쓰면 안 된다. */
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();
