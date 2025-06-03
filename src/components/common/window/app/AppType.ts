export type Area = {
    id: string;
    apps: AppItem[];
};
export interface AppItem {
    type: "folder" | "img" | "icon";
    label: string;
    name: string;
    color: string;
    className?: string;
    outlink?: string;
    link?: string;
    imgSrc?: string;
};

export interface AppIconWrapperProps { 
    type: string; 
    imgSrc?: string; 
    className?:string; 
    label: string; 
    color: string 
}

export type AppMoveAction = 
  | { type: "ADD_APP"; payload: { areaId: string; app: AppItem } }
  | { type: "MOVE_APP"; payload: { 
      sourceAreaId: string; 
      destinationAreaId: string;
      sourceIndex: number; 
      destinationIndex: number 
    }}
  | { type: "SET_APPS"; payload: { areaId: string; apps: AppItem[] } };