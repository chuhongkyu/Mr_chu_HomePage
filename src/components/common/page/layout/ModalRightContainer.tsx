import { ReactNode, forwardRef } from "react"
import styles from "@/style/sub-page.module.scss";
import { IModalRightContainer } from "./ModalType";

const ModalRightContainer = forwardRef<HTMLDivElement, IModalRightContainer>(({header, children, scroll}, ref) => {
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