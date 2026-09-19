export type Post = {
  id: string;
  title: string;
  description: string;
  image: string;
  /**
   * 썸네일을 칸에 어떻게 앉힐지. 기본은 `cover`.
   *
   * 사진이나 OG 배너는 꽉 채우는 쪽이 낫다. 반면 로고처럼 여백이 곧 형태인
   * 그림은 잘라내면 알아볼 수 없게 되므로 `contain` 으로 통째로 보여 준다.
   */
  imageFit?: "cover" | "contain";
  subImage?: string;
  url?: string;
};

export const POSTS: Post[] = [
  {
    id: "karrot",
    title: "당근마켓, 당근이네,",
    description:
      "당근마켓, Software Engineer 포지션으로 근무.\n 기획부터 개발까지",
    image: "/assets/img/daangn/logo.png",
    // 525×900 세로로 긴 로고. 정사각으로 자르면 가운데 한 조각만 남는다.
    imageFit: "contain",
  },
  {
    id: "7122521989285625856",
    title: "더 쉽고 편하게 만드는 3D 인터랙티브 웹 개발",
    description: "구현부터 최적화까지",
    image: "/assets/og/post1.jpg",
    url: "https://www.linkedin.com/posts/hong-kyu-chu-a38b9a249_%EB%8D%94-%EC%89%BD%EA%B3%A0-%ED%8E%B8%ED%95%98%EA%B2%8C-%EB%A7%8C%EB%93%9C%EB%8A%94-3d-%EC%9D%B8%ED%84%B0%EB%9E%99%ED%8B%B0%EB%B8%8C-%EC%9B%B9-%EA%B0%9C%EB%B0%9C-%EA%B5%AC%ED%98%84%EB%B6%80%ED%84%B0-%EC%B5%9C%EC%A0%81%ED%99%94%EA%B9%8C%EC%A7%80-activity-7122521989285625856-Sp1a",
  },
  {
    id: "7310031891129143297",
    title: "직접 만든 AI 서비스로 GDC 세계 무대에 서다",
    description:
      "센프란시스코에서의 GDC 참가 경험과 현장의 인사이트, 그리고 직접 만든 서비스를 고객들에게 소개하고 영업한 기록",
    image: "/assets/og/post2.jpg",
    url: "https://www.linkedin.com/posts/hong-kyu-chu-a38b9a249_gdc-activity-7310031891129143297-gZ7g",
  },
  {
    id: "artme_brush",
    title: "현대 미술",
    description:
      "추홍규 @chu_hong_kyu, <샤갈>, 2020, 장지에 수비안료, 85x125cm #KEAs2021 #KEAs2021선정작가",
    image: "/assets/og/post00.png",
    url: "https://sprout-decision-ec5.notion.site/36fc588db9e980b5b3a7fd407fc3984c?pvs=73",
  },
];
