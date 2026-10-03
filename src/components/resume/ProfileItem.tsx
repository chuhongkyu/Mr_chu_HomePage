"use client";
import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";

import { itemVariants } from "@/components/common/page/container/AnimatedVariants";

import styles from "@/style/sub-page.module.scss";

interface IWorks {
  children: ReactNode;
  title: string;
  /** 제목 아래 한 줄. 직군처럼 목록 전체에 걸리는 말만 넣는다. */
  subtitle?: string;
  icon: string;
  column?: string | number;
  row?: string;
}

function ProfileItem({
  title,
  subtitle,
  children,
  icon,
  column = "span 1",
  row = "span 1",
}: IWorks) {
  return (
    <motion.div
      className={styles["item-wrapper"]}
      variants={itemVariants}
      style={{ gridColumn: column, gridRow: row }}
      whileHover={{ y: -3 }}
    >
      {/* 아래 선은 제목과 부제를 함께 받쳐야 한다. h3 에 걸면 둘 사이로
          선이 끼어든다. */}
      <div className={styles["item-head"]}>
        <h3 className={styles["item-title"]}>
          <Image
            width={20}
            height={20}
            className={styles.icon}
            src={icon}
            alt={title}
          />
          {title}
        </h3>
        {subtitle && <p className={styles["item-subtitle"]}>{subtitle}</p>}
      </div>
      <ul className={styles.content}>{children}</ul>
    </motion.div>
  );
}

export default ProfileItem;
