"use client";

import { useState } from "react";
import IconCheckRegular from "@seed-design/react-icon/lib/IconCheckRegular";
import IconCopyRegular from "@seed-design/react-icon/lib/IconCopyRegular";
import IconRetryRegular from "@seed-design/react-icon/lib/IconRetryRegular";

import { serializeStage } from "@/components/profile/constants/daangnStage";
import { STICKMAN_HEIGHT } from "@/components/profile/constants/stickman";
import {
  type StageTarget,
  useStageEditorStore,
} from "@/components/profile/store/useStageEditorStore";

import styles from "@/components/profile/webgl/debug/StageEditorDock.module.scss";

type FieldProps = {
  label: string;
  value: number;
  step?: number;
  onChange: (value: number) => void;
};

const Field = ({ label, value, step = 0.1, onChange }: FieldProps) => (
  <label className={styles.row}>
    <span>{label}</span>
    <input
      className={styles.field}
      type="number"
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </label>
);

const TARGETS: { id: StageTarget; label: string }[] = [
  { id: "building", label: "건물" },
  { id: "spawn", label: "등장 지점" },
];

/** 당근이네 배치 편집기의 조작판. 캔버스 밖 DOM 이다. */
export const StageEditorDock = () => {
  const box = useStageEditorStore((s) => s.box);
  const spawn = useStageEditorStore((s) => s.spawn);
  const target = useStageEditorStore((s) => s.target);
  const patchBox = useStageEditorStore((s) => s.patchBox);
  const patchSpawn = useStageEditorStore((s) => s.patchSpawn);
  const select = useStageEditorStore((s) => s.select);
  const reset = useStageEditorStore((s) => s.reset);

  const [copied, setCopied] = useState(false);

  const boxAt =
    (key: "position" | "size", index: 0 | 1 | 2) => (value: number) => {
      const next: [number, number, number] = [...box[key]];
      next[index] = value;
      patchBox({ [key]: next });
    };

  const spawnAt = (index: 0 | 1 | 2) => (value: number) => {
    const next: [number, number, number] = [...spawn.position];
    next[index] = value;
    patchSpawn({ position: next });
  };

  const copy = async () => {
    await navigator.clipboard.writeText(serializeStage(box, spawn));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={styles.dock}>
      <div className={styles.title}>당근이네 배치</div>

      <div className={styles.list}>
        {TARGETS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={styles.chip}
            data-on={target === item.id}
            onClick={() => select(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {target === "building" ? (
        <>
          <Field
            label="x"
            value={box.position[0]}
            onChange={boxAt("position", 0)}
          />
          <Field
            label="y"
            value={box.position[1]}
            onChange={boxAt("position", 1)}
          />
          <Field
            label="z"
            value={box.position[2]}
            onChange={boxAt("position", 2)}
          />

          <div className={styles.note}>크기</div>
          <Field label="가로" value={box.size[0]} onChange={boxAt("size", 0)} />
          <Field label="높이" value={box.size[1]} onChange={boxAt("size", 1)} />
          <Field label="세로" value={box.size[2]} onChange={boxAt("size", 2)} />
        </>
      ) : (
        <>
          <Field label="x" value={spawn.position[0]} onChange={spawnAt(0)} />
          <Field label="y" value={spawn.position[1]} onChange={spawnAt(1)} />
          <Field label="z" value={spawn.position[2]} onChange={spawnAt(2)} />
          <Field
            label="크기"
            value={spawn.scale}
            step={0.01}
            onChange={(scale) => patchSpawn({ scale })}
          />

          <div className={styles.note}>
            키 {(STICKMAN_HEIGHT * spawn.scale).toFixed(2)} · 건물 높이{" "}
            {box.size[1]}
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
        기즈모로 끌거나 위 숫자를 고친 뒤 복사해서 `daangnStage.ts` 의 값을 갈아
        끼운다.
      </div>
    </div>
  );
};

export default StageEditorDock;
