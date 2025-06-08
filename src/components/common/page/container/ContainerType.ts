import React from "react";

export interface ItemProps {
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    id: string;
    isActive: boolean;
    text: string;
}

export interface IContentContainerProps {
    id: string;
    children: React.ReactNode;
}