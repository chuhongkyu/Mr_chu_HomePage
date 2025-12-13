import Loading from "@/components/common/Loading";
import NotionList from "@/components/common/NotionList";
import NotionContent from "@/components/project/NotionContent";
import { getProjectDetail } from "@/utils/api";

import styles from "@/style/detail-page.module.scss";

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 604800;

export default async function ProjectDetail({ params }: Props) {
  const resolvedParams = await params;

  const projectData = await getProjectDetail({
    id: resolvedParams.id,
  });

  if (!projectData) {
    return <Loading />;
  }

  return (
    <div className={styles["project-detail-container"]}>
      <div className={styles["notion-wrapper"]}>
        <NotionContent recordMap={projectData} />
      </div>
      <NotionList />
    </div>
  );
}
