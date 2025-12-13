import { forwardRef, ReactNode } from "react";

import { IModalRightContainer } from "./ModalType";

import styles from "@/style/sub-page.module.scss";

const ModalRightContainer = forwardRef<HTMLDivElement, IModalRightContainer>(
  ({ header, children, scroll }, ref) => {
    return (
      <li className={styles["modal-right-container"]}>
        {header}
        <div
          ref={ref}
          className={`${styles["window-modal-scroll-wrapper"]} ${scroll ? styles["scroll"] : ""} scroll-list-wrapper`}
        >
          {children}
        </div>
      </li>
    );
  }
);
export default ModalRightContainer;
