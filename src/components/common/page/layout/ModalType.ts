import { WithChildren } from "@/types/global";
import { ReactNode } from "react";

export interface IModalStyle extends WithChildren {
    text: string;
}

export interface ModalContextType {
    resize: boolean;
    onHandleSize: () => void;
    onExit: () => void;
}

export interface IModalRightContainer {
    header?: ReactNode;
    children: ReactNode;
    scroll?: boolean;
}