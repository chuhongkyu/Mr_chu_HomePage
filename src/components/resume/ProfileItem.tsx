"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";
import styles from "@/style/sub-page.module.scss";

interface IWorks {
  children: ReactNode;
  title: string;
  icon: string;
  column: string | number;
  row: string;
}

function ProfileItem({ title, children, icon, column, row }: IWorks) {
  return (
    <motion.div
      className={styles["item-wrapper"]}
      style={{ gridColumn: column, gridRow: row }}
      whileHover={{ y: -3 }}
    >
      <h3 className={styles["item-title"]}>
        <img className={styles.icon} src={icon} alt={title} />
        {title}
      </h3>
      <ul className={styles.content}>{children}</ul>
    </motion.div>
  );
}

ProfileItem.defaultProps = {
  column: "span 1",
  row: "span 1",
};

export default ProfileItem;
