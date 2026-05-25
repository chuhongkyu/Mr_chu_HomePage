import Loading from "@/components/common/Loading";
import NotionContent from "@/components/project/NotionContent";
import ProjectDetailShell from "@/components/project/ProjectDetailShell";
import { getProjectDetail } from "@/utils/api";

import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";
import styles from "@/style/detail-page.module.scss";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailIntercepted({ params }: Props) {
  const { id } = await params;
  const projbectData = await getProjectDetail({ id });

  if (!projbectData) return <Loading />;

  return (
    <ProjectDetailShell id={id}>
      <div className={styles["notion-wrapper"]}>
        <NotionContent recordMap={projbectData} />
      </div>
    </ProjectDetailShell>
  );
}
