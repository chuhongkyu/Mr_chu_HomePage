import { ReactNode } from "react"
import styles from "@/style/page.module.scss";

function Item({children}:{children:ReactNode}) {
    return (
        <div className={styles["item"]}>{children}</div>
    )
}

export default Item