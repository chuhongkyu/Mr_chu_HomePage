import styles from "@/style/sub-page.module.scss";
import { motion } from "motion/react";
import { WithChildren } from "@/types/global";
import { ItemProps } from "./ContainerType";
import AnimatedText from "./AnimatedText";

const Category = ({ children }: WithChildren) => {
  return (
    <ul
      className={styles["category-list"]}>
        {children}
      </ul>
    );
};

const Item = ({ onClick, id, isActive, text }: ItemProps) => {
  return (
    <li
      id={id}
      onClick={onClick} 
      className={`${styles["item"]} ${isActive ? styles["active"] : ""}`}
    >
      <AnimatedText text={text} el="p" />
    </li>
  );
};

Category.Item = Item;

export default Category;
