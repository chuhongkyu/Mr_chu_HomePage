import styles from "@/style/sub-page.module.scss";
import { WithChildren } from "@/types/global";

const ModalLeftContainer = ({children}: WithChildren) => {
    return(
      <li className={styles["modal-left-container"]}>
        {children}
      </li>
    )
}
  
export default ModalLeftContainer;