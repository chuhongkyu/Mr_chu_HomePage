export type Post = {
  id: string;
  title: string;
  description: string;
  image: string;
  subImage?: string;
  url?: string;
};

export const POSTS: Post[] = [
  {
    id: "artme_brush",
    title: "현대 미술",
    description:
      "추홍규 @chu_hong_kyu, <샤갈>, 2020, 장지에 수비안료, 85x125cm #KEAs2021 #KEAs2021선정작가",
    image: "/assets/og/post00.png",
    url: "https://sprout-decision-ec5.notion.site/36fc588db9e980b5b3a7fd407fc3984c?pvs=73",
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
    title: "GDC",
    description:
      "센프란시스코에서의 GDC 참가 경험과 현장의 인사이트, 그리고 직접 만든 서비스를 고객들에게 소개하고 영업한 기록",
    image: "/assets/og/post2.jpg",
    url: "https://www.linkedin.com/posts/hong-kyu-chu-a38b9a249_gdc-activity-7310031891129143297-gZ7g",
  },
  {
    id: "karrot",
    title: "당근이네",
    description:
      "당근마켓, 당근이네에서 Software Engineer (Frontend) 포지션으로 근무. React · TypeScript 기반 프론트엔드 개발, 사용자 경험 개선 및 서비스 기능 개발에 참여.",
    image: "/assets/img/karrot.webp",
  },
];
