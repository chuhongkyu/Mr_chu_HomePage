
export interface AppItem {
    type: "folder" | "img" | "icon";
    label: string;
    name: string;
    color: string;
    style?: React.CSSProperties;
    outlink?: string;
    link?: string;
    imgSrc?: string;
};