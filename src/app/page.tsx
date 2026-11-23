import type { CSSProperties } from "react";

import {
  absoluteUrl,
  AUTHOR,
  AUTHOR_NAMES,
  HOME_DESCRIPTION,
  OG_IMAGE,
  SAME_AS,
  SITE_URL,
} from "@/constants/site";

/**
 * 화면에서는 감추고 읽는 쪽(검색엔진·스크린리더)에는 남긴다.
 *
 * 홈은 전부 3D 캔버스라 서버가 내보내는 HTML 에 글자가 하나도 없었다.
 * `display: none` 이나 `visibility: hidden` 은 읽는 쪽에서도 지워 버리므로
 * 1px 상자에 잘라 넣는 방식을 쓴다.
 */
const READER_ONLY: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

/** "추홍규" 를 이 사이트의 주인으로 묶는다. 다른 곳의 프로필과 함께. */
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR.name,
  alternateName: AUTHOR_NAMES,
  jobTitle: AUTHOR.jobTitle,
  url: SITE_URL,
  image: absoluteUrl(OG_IMAGE.url),
  sameAs: SAME_AS,
};

const IndexPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        // 스키마는 우리가 만든 객체라 외부 입력이 섞이지 않는다.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      {/* 감춘 글은 화면에 보이는 것과 같은 말만 한다. 보이는 데 없는 말을
          채워 넣으면 숨긴 텍스트로 걸린다. */}
      <div style={READER_ONLY}>
        <h1>추홍규 (MR.CHU) — 프론트엔드 개발자</h1>
        <p>{HOME_DESCRIPTION}</p>
      </div>
    </>
  );
};

export default IndexPage;
