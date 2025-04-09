import styles from "@/style/page.module.scss";
import { determineBadgeColor } from "./Tools";

export const keywords = [
    {
        name: "리액트",
        value: "리액트",
        checked: false,
    },
    {
        name: "NEXT.js",
        value: "넥스트",
        checked: false,
    },
    {
        name: "다국어",
        value: "다국어",
        checked: false,
    },
    {
        name: "JS",
        value: "바닐라 JS",
        checked: false,
    },
    {
        name: "scss",
        value: "scss",
        checked: false,
    },
    {
        name: "app",
        value: "앱",
        checked: false,
    },
    {
        name: "TS",
        value: "TS",
        checked: false,
    }
]

interface IProps {
    name: string;
    value: string;
    checked: boolean;
}

const KeywordBtn = ({ name, value }:IProps) => {
    return(
        <div 
            className={styles["badge"]} 
            style={{ background: determineBadgeColor(name) }}>
            <input
                type="checkbox"
                id={name}
                name={name}
                value={value}
            />
            <label htmlFor={name}>{value}</label>
        </div>
    )
}

export default KeywordBtn