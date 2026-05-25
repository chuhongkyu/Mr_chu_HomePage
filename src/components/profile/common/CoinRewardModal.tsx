"use client";

import { useEffect } from "react";
import { AnimatePresence,motion } from "motion/react";

import styles from "@/components/profile/common/CoinRewardModal.module.scss";

type Props = {
  show: boolean;
  amount?: number;
  onClose: () => void;
};

const CoinRewardModal = ({ show, amount = 1, onClose }: Props) => {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, 2200);
    return () => clearTimeout(t);
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.card}
            initial={{ scale: 0.7, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: -10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <motion.span
              className={styles.coin}
              animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              🪙
            </motion.span>
            <p className={styles.label}>+{amount} Coin</p>
            <p className={styles.sub}>나를 알아봐줘서 고마워요!</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoinRewardModal;
