"use client"

import ModalStyle from "./ModalStyle";
import { ModalProvider } from "./ModalProvider";
import { IModalStyle } from "./ModalType";

const ModalLayout = ({
    children,
    text,
}: IModalStyle) => {
    return(
        <ModalProvider>
            <ModalStyle>
                <ModalStyle.Nav>{text}</ModalStyle.Nav>
                {children}
            </ModalStyle>
        </ModalProvider>
    )
}

export default ModalLayout;