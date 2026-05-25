"use client";

import { ModalProvider } from "@/components/common/page/layout/ModalProvider";
import ModalStyle from "@/components/common/page/layout/ModalStyle";
import { IModalStyle } from "@/components/common/page/layout/ModalType";

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
