import { useDevMode } from "@/components/devtools/useDevMode";
import { useDevToolsStore } from "@/components/profile/store/useDevToolsStore";

/** 유리 패널 배치 편집기가 켜졌는지. `?mode=edit` 의 도구 모음에서 켠다. */
export const usePanelEditing = () => {
  const dev = useDevMode();
  const on = useDevToolsStore((s) => s.tools.panels);
  return dev && on;
};
