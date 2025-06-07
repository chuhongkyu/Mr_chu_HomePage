export interface ItemProps {
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
    id: string;
    isActive: boolean;
    text: string;
 }