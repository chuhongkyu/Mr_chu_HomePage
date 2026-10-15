import { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site";

/**
 * `public/robots.txt` 로 두지 마라.
 *
 * 정적 파일이면 `SITE_URL` 과 따로 놀아서 호스트가 조용히 어긋난다. 실제로
 * 그랬다 — 사이트맵과 canonical 은 www 로 고쳤는데 robots 만 비 www 를
 * 가리킨 채 남아 있었다. 여기서 만들면 상수 한 곳만 고치면 된다.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
