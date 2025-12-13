"use client";

import { ModalProvider } from "./ModalProvider";
import ModalStyle from "./ModalStyle";
import { IModalStyle } from "./ModalType";

const ModalLayout = ({ children, text }: IModalStyle) => {
  return (
    <ModalProvider>
      <ModalStyle>
        <ModalStyle.Nav>{text}</ModalStyle.Nav>
        {children}
      </ModalStyle>
    </ModalProvider>
  );
};

export default ModalLayout;
