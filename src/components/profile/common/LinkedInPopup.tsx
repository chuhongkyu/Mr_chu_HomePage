"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { usePostViewStore } from "@/components/profile/store/usePostViewStore";
import { useCoinStore } from "@/components/profile/store/useCoinStore";
import CoinRewardModal from "@/components/profile/common/CoinRewardModal";
import { ChevronLeft } from "lucide-react";
import styles from "./LinkedInPopup.module.scss";

type Props = {
  postId: string;
  onClose: () => void;
};

const COUNTDOWN = 5;

const LinkedInPopup = ({ postId, onClose }: Props) => {
  const { viewed, markViewed } = usePostViewStore();
  const earn = useCoinStore((s) => s.earn);
  const alreadyViewed = viewed[postId] ?? false;

  const [count, setCount] = useState(alreadyViewed ? 0 : COUNTDOWN);
  const [showReward, setShowReward] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (alreadyViewed) return;

    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          markViewed(postId);
          earn(1);
          setShowReward(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [postId, alreadyViewed, markViewed, earn]);

  return (
    <>
      <motion.div
        className={styles.overlay}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.4 }}
      >
        {/* 상단 뒤로가기 */}
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onClose}>
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* iframe */}
        <div className={styles.iframeWrap}>
          <iframe
            src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${postId}`}
            className={styles.iframe}
            frameBorder="0"
            allowFullScreen
          />
        </div>

        {/* 5초 카운터 */}
        {!alreadyViewed && count > 0 && (
          <div className={styles.counter}>
            <svg viewBox="0 0 36 36" className={styles.ring}>
              <circle cx="18" cy="18" r="15" className={styles.ringBg} />
              <circle
                cx="18"
                cy="18"
                r="15"
                className={styles.ringFill}
                strokeDasharray={`${((COUNTDOWN - count) / COUNTDOWN) * 94} 94`}
              />
            </svg>
            <span className={styles.countNum}>{count}</span>
          </div>
        )}

        {(alreadyViewed || count === 0) && !showReward && (
          <div className={styles.viewed}>✓ 읽음</div>
        )}
      </motion.div>

      <CoinRewardModal
        show={showReward}
        amount={1}
        onClose={() => setShowReward(false)}
      />
    </>
  );
};

export default LinkedInPopup;
