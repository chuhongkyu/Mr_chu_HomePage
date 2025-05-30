
export interface AppItem {
    type: "folder" | "img" | "icon";
    label: string;
    name: string;
    color: string;
    link: string;
    imgSrc?: string;
};