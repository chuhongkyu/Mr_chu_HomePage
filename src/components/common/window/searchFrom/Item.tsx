import { ReactNode } from "react";

import { WithChildren } from "@/types/global";

import styles from "@/style/page.module.scss";

function Item({ children }: WithChildren) {
  return <div className={styles["item"]}>{children}</div>;
}

export default Item;
