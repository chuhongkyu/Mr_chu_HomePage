import styles from "@/style/sub-page.module.scss";
import { motion } from "motion/react";
import { WithChildren } from "@/types/global";
import { ItemProps } from "./ContainerType";
import AnimatedText from "./AnimatedText";

const listVariants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Category = ({ children }: WithChildren) => {
  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className={styles["category-list"]}>
        {children}
      </motion.ul>
    );
};

const Item = ({ onClick, id, isActive, text }: ItemProps) => {
  return (
    <motion.li
      variants={itemVariants}
      id={id}
      onClick={onClick} 
      className={`${styles["item"]} ${isActive ? styles["active"] : ""}`}
    >
      <AnimatedText text={text} el="p" />
    </motion.li>
  );
};

Category.Item = Item;

export default Category;
