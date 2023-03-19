// SEOmetaData.tsx
import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = () => {
  const metaData = {
    title: "Mr.chu 홈페이지",
    description: "추홍규 | 프론트 엔드의 홈페이지입니다. 한국화 전공에서 개발자로 전향한 그의 이력을 확인 할 수 있습니다. 컴퓨터 화면과 같은 홈페이지를 감상해 보세요.",
    keywords: "추홍규 · 프론트 엔드 · Mr.chu · 포트폴리오 · chu_hong_kyu",
    imgsrc:
      "https://raw.githubusercontent.com/chuhongkyu/Mr_chu_HomePage/main/public/assets/home.png",
    url: "https://chuhongkyu.github.io/Mr_chu_HomePage",
  };
  return (
    <Helmet>
      <title>{metaData.title}</title>

      <meta name="description" content={metaData.description} />
      <meta name="keywords" content={metaData.keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaData.title} />
      <meta property="og:site_name" content={metaData.title} />
      <meta property="og:description" content={metaData.description} />
      <meta property="og:image" content={metaData.imgsrc} />
      <meta property="og:url" content={metaData.url} />

      <meta name="twitter:title" content={metaData.title} />
      <meta name="twitter:description" content={metaData.description} />
      <meta name="twitter:image" content={metaData.imgsrc} />
      <link rel="canonical" href={metaData.url} />
    </Helmet>
  );
};

export default Meta;
