import NotionContent from "@/components/project/NotionContent";
import ProjectDetailShell from "@/components/project/ProjectDetailShell";
import { getProjectDetail } from "@/utils/api";

import styles from "@/style/detail-page.module.scss";

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

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  const projectData = await getProjectDetail({
    id: id,
  });

  return (
    <ProjectDetailShell id={id}>
      <div className={styles["notion-wrapper"]}>
        <NotionContent recordMap={projectData} />
      </div>
    </ProjectDetailShell>
  );
}
