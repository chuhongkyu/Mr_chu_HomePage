import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 기본은 .next 지만, 검증용 빌드는 다른 곳에 쌓을 수 있게 열어둔다.
  // dev 서버와 프로덕션 빌드가 같은 디렉토리를 쓰면 빌드가 dev 의 매니페스트를
  // 덮어써서 돌던 서버가 죽는다. (app-paths-manifest.json ENOENT)
  distDir: process.env.NEXT_DIST_DIR || ".next",

  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
        "*.glsl": {
          loaders: ["raw-loader"],
          as: "*.js",
        },
      },
    },
  },

  sassOptions: {
    // includePaths 는 레거시 Sass API, loadPaths 는 모던 API 용 키다.
    // Next 는 전자를, Storybook 의 sass-loader 는 후자를 읽으므로 둘 다 선언한다.
    // 덕분에 각 파일이 `@use "system" as *;` 한 줄로 디자인 시스템을 가져온다.
    includePaths: [path.join(__dirname, "src/style")],
    loadPaths: [path.join(__dirname, "src/style")],
    // additionalData 로 주입하지 않는다.
    // 소스에 없는 의존이라 번들러가 추적을 못 해서, 토큰을 다시 생성해도
    // 이미 컴파일된 CSS 모듈이 갱신되지 않는다. dev 재시작을 부르던 원인.
  },

  webpack(config) {
    // 기존 svg 처리 룰 찾기
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // *.svg?url → 기존 방식(URL)으로 처리
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      // 나머지 *.svg → React 컴포넌트
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: ["@svgr/webpack"],
      }
    );

    // 기존 룰에서 .svg 제외
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.glsl$/,
      use: "raw-loader",
    });

    return config;
  },
};

export default nextConfig;
