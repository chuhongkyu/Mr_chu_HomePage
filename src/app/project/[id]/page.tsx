import NotionContent from "@/components/project/NotionContent";
import ProjectDetailShell from "@/components/project/ProjectDetailShell";
import { getProjectDetail } from "@/utils/api";

import styles from "@/style/detail-page.module.scss";

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 604800;

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
