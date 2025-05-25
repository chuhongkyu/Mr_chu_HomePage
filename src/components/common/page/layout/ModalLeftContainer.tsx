import { ReactNode } from "react";
import styles from "@/style/sub-page.module.scss";

const ModalLeftContainer = ({children}: {children: ReactNode}) => {
    return(
      <li className={styles["modal-left-container"]}>
        {children}
      </li>
    )
}
  
export default ModalLeftContainer;