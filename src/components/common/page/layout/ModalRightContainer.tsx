import { forwardRef, ReactNode } from "react";

import { IModalRightContainer } from "@/components/common/page/layout/ModalType";

import styles from "@/style/sub-page.module.scss";

const ModalRightContainer = forwardRef<HTMLDivElement, IModalRightContainer>(
  ({ header, children, scroll, fullWidth }, ref) => {
    return (
      <li className={`${styles["modal-right-container"]} ${fullWidth ? styles["full-width"] : ""}`}>
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
