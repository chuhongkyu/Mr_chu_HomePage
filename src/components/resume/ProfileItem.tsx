"use client";
import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "motion/react";

import { itemVariants } from "@/components/common/page/container/AnimatedVariants";

import styles from "@/style/sub-page.module.scss";

interface IWorks {
  children: ReactNode;
  title: string;
  icon: string;
  column?: string | number;
  row?: string;
}

function ProfileItem({
  title,
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
      <ul className={styles.content}>{children}</ul>
    </motion.div>
  );
}

export default ProfileItem;
