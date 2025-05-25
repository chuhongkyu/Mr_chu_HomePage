import { ReactNode } from "react";
import styles from "@/style/sub-page.module.scss";

interface CategoryItemProps {
  children: ReactNode;
}

interface ItemProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  id: string;
  isActive: boolean;
  text: string;
}

const Category = ({ children }: CategoryItemProps) => {
  return <ul className={styles["category-items"]}>{children}</ul>;
};

const Item = ({ onClick, id, isActive, text }: ItemProps) => {
  return (
    <li 
      onClick={onClick} 
      id={id} 
      className={`${styles["item"]} ${isActive ? styles["active"] : ""}`}
    >
      {text}
    </li>
  );
};

Category.Item = Item;

export default Category;
