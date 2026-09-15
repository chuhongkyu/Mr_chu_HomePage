"use client";

import { useEffect } from "react";

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
export default function ProjectDetailModalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[@modal/(.)project/[id]] 렌더링 실패:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        minHeight: "60vh",
        padding: 24,
        textAlign: "center",
        color: "var(--color-font-base)",
      }}
    >
      <h2 style={{ fontSize: 16, margin: 0 }}>
        프로젝트를 불러오지 못했습니다
      </h2>
      <p style={{ fontSize: 13, color: "var(--color-font-muted)", margin: 0 }}>
        {error.message}
      </p>
      {error.digest && (
        <code style={{ fontSize: 11, color: "var(--color-font-muted)" }}>
          digest: {error.digest}
        </code>
      )}
      <button
        type="button"
        onClick={reset}
        style={{
          marginTop: 8,
          padding: "8px 16px",
          borderRadius: 999,
          border: "1px solid var(--color-border)",
          background: "var(--color-bg-surface)",
          color: "var(--color-font-base)",
          cursor: "pointer",
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
