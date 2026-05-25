import Loading from "@/components/common/Loading";
import NotionContent from "@/components/project/NotionContent";
import ProjectDetailShell from "@/components/project/ProjectDetailShell";
import { getProjectDetail } from "@/utils/api";

import styles from "@/style/detail-page.module.scss";

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 604800;

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  const projectData = await getProjectDetail({
    id: id,
  });

  if (!projectData) return <Loading />;

  return (
    <ProjectDetailShell id={id}>
      <div className={styles["notion-wrapper"]}>
        <NotionContent recordMap={projectData} />
      </div>
    </ProjectDetailShell>
  );
}
