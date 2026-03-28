export type Post = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
};

export const LINKEDIN_POSTS: Post[] = [
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
];
