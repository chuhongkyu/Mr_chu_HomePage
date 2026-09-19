import { useEffect, useState } from "react";

/**
 * `?panels=edit` 배치 편집기가 켜졌는지.
 *
 * 편집기 본체와 한 파일에 두면 안 된다. 씬이 이 훅을 정적으로 가져가면서
 * 편집기 UI 까지 프로덕션 번들에 딸려 들어간다. `NODE_ENV` 검사는 실행만
 * 막을 뿐 번들링을 막지 못한다.
 */
export const usePanelEditing = () => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    setOn(new URLSearchParams(window.location.search).get("panels") === "edit");
  }, []);

  return on;
};
