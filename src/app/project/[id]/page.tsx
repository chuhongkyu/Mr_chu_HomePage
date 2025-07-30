import Loading from '@/components/common/Loading';
import { getProjectDetail } from '@/utils/api';
import { NotionRenderer } from 'react-notion';
import styles from '@/style/detail-page.module.scss';
import NotionList from '@/components/common/NotionList';

type Props = {
  params: Promise<{ id: string }>
}

export const revalidate = 604800;

export default async function ProjectDetail({ params }: Props) {
  const resolvedParams = await params;
  
  const projectData = await getProjectDetail({ 
    id: resolvedParams.id
  });

  if (!projectData) {
    return <Loading/>;
  }

  return (
    <div className={styles["project-detail-container"]}>
      <div className={styles["notion-wrapper"]}>
        <NotionRenderer blockMap={projectData} />
      </div>
      <NotionList />
    </div>
  );
}
