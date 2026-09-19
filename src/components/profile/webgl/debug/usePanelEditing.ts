import { useEffect, useState } from "react";

/**
 * `?panels=edit` 이 붙어 있고 개발 모드일 때만 켠다.
 *
 * 편집기 본체(`PanelEditor`)와 한 파일에 두지 않는다. 씬이 이 훅을 정적으로
 * 가져가면 편집기 UI 까지 프로덕션 번들에 딸려 들어간다. `NODE_ENV` 검사는
 * 실행을 막을 뿐 번들링을 막지 못한다.
 *
 * `useSearchParams` 도 쓰지 않는다. 그걸 쓰면 이 씬을 담은 페이지 전체가
 * CSR 바운더리로 끌려 들어간다. 편집기 하나 때문에 프로덕션 렌더 방식을
 * 바꿀 이유가 없다.
 */
export const usePanelEditing = () => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    setOn(new URLSearchParams(window.location.search).get("panels") === "edit");
  }, []);

  return on;
};
