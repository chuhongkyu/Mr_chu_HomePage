import Link from "next/link";
import IconCloseRegular from "@seed-design/react-icon/lib/IconCloseRegular";

import styles from "@/style/detail-page.module.scss";

type Props = {
  title: string;
  children: React.ReactNode;
};

/**
 * 링크로 곧장 들어왔을 때의 글 화면.
 *
 * 서버 컴포넌트다. 씬에서 누를 때는 인터셉트 라우트가 바텀시트로 띄우고,
 * 이 경로는 공유 링크와 크롤러만 온다. 시트로 감싸면 열림 여부가 effect 에
 * 달려 있어서 서버 HTML 이 통째로 비고, 그러면 검색에 아무것도 안 잡힌다.
 */
const ProjectArticle = ({ title, children }: Props) => (
  <div className={styles["article-overlay"]}>
    <Link href="/" className={styles["article-close"]} aria-label="닫기">
      <IconCloseRegular size={20} />
    </Link>

    <div className={styles["scroll-wrapper"]}>
      <article className={styles["notion-wrapper"]}>
        <h1 className={styles["article-title"]}>{title}</h1>
        {children}
      </article>
    </div>
  </div>
);

export default ProjectArticle;
