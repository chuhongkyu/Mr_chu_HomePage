// SEOmetaData.js
import React from "react";
import { Helmet } from "react-helmet-async";

const Meta = () => {
  const metaData = {
    title: "Mr.chu 홈페이지",
    description: "Mr.chu 홈페이지 - 개발자, 포트폴리오, 프론트엔드",
    keywords: "개발자, 프론트 엔드, 미스터추, 포트폴리오",
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
