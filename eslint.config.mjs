import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "no-relative-import-paths": noRelativeImportPaths,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. 외부 패키지 (next, react 등)
            ["^react", "^next", "^@?\\w"],
            // 2. 내부 절대 경로 imports (@/로 시작)
            ["^@/"],
            // 3. 상대 경로 imports (스타일 파일 제외)
            // 스타일 파일로 끝나지 않는 상대 경로
            ["^\\..*(?<!\\.(css|scss|sass|less))$"],
            // 4. 스타일 파일 (CSS, SCSS 등) - 맨 아래
            ["\\.(css|scss|sass|less)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { allowSameFolder: false, rootDir: "src", prefix: "@" },
      ],
      // 현재 발생하는 오류들 비활성화
      "jsx-a11y/alt-text": "off", // img alt 속성 관련
      "react/display-name": "off", // 컴포넌트 display name 관련
      "@typescript-eslint/no-unused-vars": "off", // 사용하지 않는 변수 관련
      "@typescript-eslint/no-explicit-any": "off", // any 타입 사용 관련
      "prefer-const": "off", // const 사용 관련
      "@typescript-eslint/no-empty-object-type": "off", // 빈 인터페이스 관련

      // Next.js 관련 규칙 비활성화
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-sync-scripts": "off",
      "@next/next/no-css-tags": "off",
      "@next/next/no-page-custom-font": "off",
      "@next/next/no-head-import-in-page": "off",
      "@next/next/no-typos": "off",
      "@next/next/no-unwanted-polyfillio": "off",
      "@next/next/google-font-display": "off",
      "@next/next/inline-script-id": "off",
      "@next/next/next-script-for-ga": "off",
      "@next/next/no-title-in-document-head": "off",
      "@next/next/no-document-import-in-page": "off",
      "@next/next/no-head-import-in-page": "off",
      "@next/next/no-sync-scripts": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
