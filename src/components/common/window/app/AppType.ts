
export interface AppItem {
    type: "folder" | "img" | "icon";
    label: string;
    name: string;
    color: string;
    outlink?: string;
    link?: string;
    imgSrc?: string;
};