"use client"

import { ReactNode } from "react";
import ModalStyle from "./ModalStyle";
import { ModalProvider } from "./ModalProvider";

const ModalLayout = ({children, text}: {children: ReactNode, text: string}) => {
    return(
        <ModalProvider>
            <ModalStyle>
                <ModalStyle.Nav>{text}</ModalStyle.Nav>
                <ModalStyle.Content>{children}</ModalStyle.Content>
            </ModalStyle>
        </ModalProvider>
    )
}

export default ModalLayout;