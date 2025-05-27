import Loading from '@/components/common/Loading';
import { getProjectDetail } from '@/utils/api';
import { NotionRenderer } from 'react-notion';
import styles from '@/style/detail-page.module.scss';

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const projectData = await getProjectDetail({ id: params.id });

  if (!projectData) {
    return <Loading/>
  }

  return (
    <div className={styles["notion-wrapper"]}>
      <NotionRenderer blockMap={projectData} />
    </div>
  );
}
