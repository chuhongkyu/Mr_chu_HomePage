import { useDevMode } from "@/components/devtools/useDevMode";
import { useDevToolsStore } from "@/components/profile/store/useDevToolsStore";

/** 당근이네 배치 편집기가 켜졌는지. `?mode=edit` 의 도구 모음에서 켠다. */
export const useStageEditing = () => {
  const dev = useDevMode();
  const on = useDevToolsStore((s) => s.tools.stage);
  return dev && Boolean(on);
};
