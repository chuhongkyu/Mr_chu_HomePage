import type { Metadata } from "next";

import MarkViewed from "@/components/project/MarkViewed";
import NotionContent from "@/components/project/NotionContent";
import ProjectArticle from "@/components/project/ProjectArticle";
import {
  absoluteUrl,
  AUTHOR,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/constants/site";
import { getProjectDetail } from "@/utils/api";
import { getNotionDescription, getNotionTitle } from "@/utils/notionMeta";

import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";

type Props = {
  params: Promise<{ id: string }>;
};

// 노션에서 글을 고치면 이 시간 안에 반영된다.
export const revalidate = 60;

// 스냅샷 목록에 없는 ID 는 404.
export const dynamicParams = false;

// Next 는 page/layout 에서 export 된 generateStaticParams 만 인식한다.
// 별도 파일에 두기만 하면 호출되지 않아 라우트가 통째로 동적 렌더링된다.
export { generateStaticParams } from "@/app/project/[id]/generateStaticParams";

/**
 * 제목과 설명은 노션 글에서 뽑는다.
 *
 * 따로 적어 두면 글을 고칠 때마다 두 곳을 맞춰야 하고 반드시 어긋난다.
 * 예전에는 모든 글이 `Project | MR.CHU` 하나였고, 구글은 그런 묶음을
 * 중복으로 본다.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const recordMap = await getProjectDetail({ id });

  const title = getNotionTitle(recordMap) || "Project";
  const description = getNotionDescription(recordMap);
  const path = `/project/${id}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      // Next 는 openGraph 를 통째로 덮어쓴다. 자식이 이 항목을 선언하는 순간
      // 부모(layout)의 images 는 딸려오지 않으므로 여기서 다시 적어야 한다.
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const recordMap = await getProjectDetail({ id });

  const title = getNotionTitle(recordMap) || "Project";
  const description = getNotionDescription(recordMap);

  /** 검색엔진이 글·글쓴이를 구조로 읽게 한다. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: absoluteUrl(`/project/${id}`),
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      alternateName: AUTHOR.alternateName,
      jobTitle: AUTHOR.jobTitle,
      url: SITE_URL,
    },
    publisher: { "@type": "Person", name: AUTHOR.name, url: SITE_URL },
    inLanguage: "ko-KR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // 스키마는 우리가 만든 객체라 외부 입력이 섞이지 않는다.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarkViewed id={id} />

      <ProjectArticle title={title}>
        <NotionContent recordMap={recordMap} />
      </ProjectArticle>
    </>
  );
}
