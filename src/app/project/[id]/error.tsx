"use client";

import { useEffect } from "react";

import styles from "@/app/project/[id]/error.module.scss";

/**
 * 프로젝트 상세 렌더링이 실패했을 때의 화면.
 *
 * 예전에는 `getProjectDetail` 이 null 을 돌려주고 페이지가 `<Loading />` 을
 * 렌더했다. 실패가 무한 로딩으로 보여서 아무도 눈치채지 못했고, 그 화면이
 * 200 OK 로 나갔다. 실패는 실패처럼 보여야 한다.
 *
 * Next 는 프로덕션에서 서버 컴포넌트의 에러 메시지를 클라이언트로 보내지 않고
 * digest 해시만 준다. 그 digest 로 Vercel 함수 로그의 해당 줄을 찾을 수 있다.
 */
export default function ProjectDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[project/[id]] 렌더링 실패:", error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>프로젝트를 불러오지 못했습니다</h2>
      <p className={styles.message}>{error.message}</p>
      {error.digest && (
        <code className={styles.digest}>digest: {error.digest}</code>
      )}
      <button type="button" className={styles.retry} onClick={reset}>
        다시 시도
      </button>
    </div>
  );
}
