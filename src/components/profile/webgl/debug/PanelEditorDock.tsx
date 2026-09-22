import { useState } from "react";
import IconCheckRegular from "@seed-design/react-icon/lib/IconCheckRegular";
import IconCopyRegular from "@seed-design/react-icon/lib/IconCopyRegular";
import IconRetryRegular from "@seed-design/react-icon/lib/IconRetryRegular";

import { usePanelEditorStore } from "@/components/profile/store/usePanelEditorStore";
import {
  axisFor,
  type Placement,
  serializePanels,
  toWorld,
} from "@/components/profile/webgl/scenes/fastcampusPanels";

import styles from "@/components/profile/webgl/debug/PanelEditorDock.module.scss";

type FieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

const Field = ({ label, value, onChange }: FieldProps) => (
  <label className={styles.row}>
    <span>{label}</span>
    <input
      className={styles.field}
      type="number"
      step={0.1}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </label>
);

/**
 * 판 배치 편집기의 조작판. 캔버스 밖 DOM 이다.
 *
 * 축은 손으로 고르지 않는다. 판을 옮기면 `axisFor` 가 자리에 맞는 축을
 * 다시 정한다. 여기서는 그 결과만 보여 준다.
 */
export const PanelEditorDock = () => {
  const panels = usePanelEditorStore((s) => s.panels);
  const selectedId = usePanelEditorStore((s) => s.selectedId);
  const select = usePanelEditorStore((s) => s.select);
  const patch = usePanelEditorStore((s) => s.patch);
  const reset = usePanelEditorStore((s) => s.reset);

  const [copied, setCopied] = useState(false);

  const selected = panels.find((p) => p.id === selectedId);
  const world = selected ? toWorld(...selected.at) : null;

  const moveTo = (index: 0 | 1 | 2, value: number) => {
    if (!selected) return;
    const at: Placement["at"] = [...selected.at];
    at[index] = value;
    patch({ at });
  };

  const copy = async () => {
    await navigator.clipboard.writeText(serializePanels(panels));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={styles.dock}>
      <div className={styles.title}>PANEL EDITOR</div>

      <div className={styles.list}>
        {panels.map((panel) => (
          <button
            key={panel.id}
            type="button"
            className={styles.chip}
            data-on={panel.id === selectedId}
            onClick={() => select(panel.id)}
          >
            {panel.id}
          </button>
        ))}
      </div>

      {selected && world && (
        <>
          <Field
            label="right"
            value={selected.at[0]}
            onChange={(v) => moveTo(0, v)}
          />
          <Field
            label="up"
            value={selected.at[1]}
            onChange={(v) => moveTo(1, v)}
          />
          <Field
            label="depth"
            value={selected.at[2]}
            onChange={(v) => moveTo(2, v)}
          />
          <Field
            label="width"
            value={selected.width}
            onChange={(v) => patch({ width: v })}
          />
          <Field
            label="height"
            value={selected.height}
            onChange={(v) => patch({ height: v })}
          />

          <div className={styles.note}>
            축 {selected.axis ?? axisFor(world)}
            {selected.axis ? " (고정)" : " (자동)"} · 월드{" "}
            {world.map((v) => v.toFixed(1)).join(", ")}
          </div>
        </>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={copy}
          aria-label="소스 복사"
          title="소스 복사"
        >
          {copied ? (
            <IconCheckRegular size={14} />
          ) : (
            <IconCopyRegular size={14} />
          )}
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={reset}
          aria-label="되돌리기"
          title="되돌리기"
        >
          <IconRetryRegular size={14} />
        </button>
      </div>

      <div className={styles.note}>
        기즈모로 끌거나 위 숫자를 고친 뒤 복사해서 `fastcampusPanels.ts` 의
        배열을 갈아 끼운다.
      </div>
    </div>
  );
};

export default PanelEditorDock;
