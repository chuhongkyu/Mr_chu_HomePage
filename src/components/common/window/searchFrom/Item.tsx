import { ReactNode } from "react"
import styles from "@/style/page.module.scss";
import { WithChildren } from "@/types/global";

function Item({children}:WithChildren) {
    return (
        <div className={styles["item"]}>{children}</div>
    )
}

export default Item