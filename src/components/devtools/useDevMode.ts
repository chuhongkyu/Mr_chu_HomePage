import { useEffect, useState } from "react";

/**
 * `?mode=edit` 이고 개발 모드인지.
 *
 * 도구 본체와 한 파일에 두지 않는다. 화면이 이 훅을 정적으로 가져가면
 * 개발용 UI 까지 프로덕션 번들에 딸려 들어간다. `NODE_ENV` 검사는 실행을
 * 막을 뿐 번들링을 막지 못한다.
 */
export const useDevMode = () => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    setOn(new URLSearchParams(window.location.search).get("mode") === "edit");
  }, []);

  return on;
};
