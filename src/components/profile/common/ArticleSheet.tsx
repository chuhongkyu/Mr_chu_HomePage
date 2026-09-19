"use client";

import { useEffect, useState } from "react";
import type { ExtendedRecordMap } from "notion-types";

import Loading from "@/components/common/Loading";
import BottomSheet from "@/components/profile/common/BottomSheet";
import NotionContent from "@/components/project/NotionContent";

import styles from "@/components/profile/common/ArticleSheet.module.scss";

export type ArticleSheetProps = {
  /** 노션 페이지 ID. `public/notion/<id>.json` 에 스냅샷이 있어야 한다. */
  id: string;
  isOpen: boolean;
  onClose: () => void;
};

/**
 * 씬 위에 글을 띄우는 시트.
 *
 * 라우트를 바꾸지 않는다. `/project/[id]` 로 이동하면 `RootLayout` 의
 * Suspense 경계가 통째로 fallback 으로 바뀌면서 3D 씬이 날아갔다 다시 뜬다.
 * 씬은 그대로 두고 DOM 만 얹는 게 목적이라 라우팅을 쓰지 않는다.
 *
 * recordMap 은 열 때 한 번만 받아온다. 빌드 산출물이 아니라 정적 JSON 이라
 * 초기 번들에 들어가지 않는다.
 */
export const ArticleSheet = ({ id, isOpen, onClose }: ArticleSheetProps) => {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!isOpen || recordMap || failed) return;

    let cancelled = false;
    fetch(`/notion/${id}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: ExtendedRecordMap) => {
        if (!cancelled) setRecordMap(data);
      })
      .catch((error) => {
        console.error("[ArticleSheet] 스냅샷을 불러오지 못했습니다:", error);
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, id, recordMap, failed]);

  if (!isOpen) return null;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} showCloseButton>
      <div className={styles.body}>
        {recordMap && <NotionContent recordMap={recordMap} />}
        {!recordMap && !failed && (
          <div className={styles.center}>
            <Loading />
          </div>
        )}
        {failed && (
          <p className={styles.center}>글을 불러오지 못했습니다.</p>
        )}
      </div>
    </BottomSheet>
  );
};

export default ArticleSheet;
