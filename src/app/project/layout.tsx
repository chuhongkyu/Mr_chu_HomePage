import ModalLayout from "@/components/common/page/layout/ModalLayout";
import styles from '@/style/detail-page.module.scss';
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalLayout text="Project">
        <div className={styles["scroll-wrapper"]}>{children}</div>
    </ModalLayout>
  );
};

export default ProjectLayout;