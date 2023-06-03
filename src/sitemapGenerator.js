require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./sitemapRoutes").default; // 좀 전에 만든 sitemapRoutes 파일이 있는 경로
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .build("https://mrchu.netlify.app") // 도메인
    .save("./public/sitemap.xml"); // sitemap.xml 파일이 생성될 위치
}

generateSitemap();
