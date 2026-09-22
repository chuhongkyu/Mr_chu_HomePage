"use client";

import { useRef } from "react";

import {
  DEV_TOOLS,
  useDevToolsStore,
} from "@/components/profile/store/useDevToolsStore";

import styles from "@/components/devtools/DevTools.module.scss";

/** 이만큼도 안 움직였으면 끈 게 아니라 누른 것으로 본다. */
const DRAG_SLOP = 4;

/**
 * 개발용 도구 모음.
 *
 * `?mode=edit` 일 때만 뜬다. 자리와 켜둔 도구는 로컬 저장소에 남아서
 * 새로고침해도 하던 자리 그대로다.
 */
export const DevTools = () => {
  const { open, x, y, tools, setOpen, move, toggle } = useDevToolsStore();

  const drag = useRef<{ dx: number; dy: number; moved: boolean } | null>(null);

  const onPointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { dx: event.clientX - x, dy: event.clientY - y, moved: false };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const state = drag.current;
    if (!state) return;

    const nextX = event.clientX - state.dx;
    const nextY = event.clientY - state.dy;
    if (Math.abs(nextX - x) + Math.abs(nextY - y) > DRAG_SLOP) {
      state.moved = true;
    }

    // 화면 밖으로 못 나가게 가둔다. 한 번 나가면 다시 잡을 수가 없다.
    move(
      Math.min(Math.max(nextX, 0), window.innerWidth - 34),
      Math.min(Math.max(nextY, 0), window.innerHeight - 34)
    );
  };

  const onPointerUp = () => {
    const state = drag.current;
    drag.current = null;
    if (state && !state.moved) setOpen(!open);
  };

  return (
    <div className={styles.root} style={{ left: x, top: y }}>
      <button
        type="button"
        className={styles.handle}
        data-open={open}
        data-dragging={Boolean(drag.current)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        aria-label="개발 도구"
        aria-expanded={open}
      >
        ⚙
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.title}>DEV TOOLS</div>

          {DEV_TOOLS.map(({ id, label, hint }) => (
            <label key={id} className={styles.tool}>
              <input
                type="checkbox"
                checked={tools[id]}
                onChange={() => toggle(id)}
              />
              {label}
              <span className={styles.hint}>{hint}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DevTools;
