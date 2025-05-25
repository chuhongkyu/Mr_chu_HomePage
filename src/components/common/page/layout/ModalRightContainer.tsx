import { ReactNode, forwardRef } from "react"
import styles from "@/style/sub-page.module.scss";

const ModalRightContainer = forwardRef<HTMLDivElement, {header?: ReactNode, children: ReactNode, scroll?: boolean}>(({header, children, scroll}, ref) => {
    return(
      <li className={styles["modal-right-container"]}>
        {header}
        <div ref={ref} className={`${styles["window-modal-scroll-wrapper"]} ${scroll ? styles["scroll"] : ""}`}>
          {children}
        </div>
      </li>
    )
})
export default ModalRightContainer;