import styles from "@/style/page.module.scss";

const AppWidget = () => {
    return (
        <div className={styles["app-widget-container"]}>
            <div className={styles["item-wrapper"]}>
                <div className={styles["itme-wrapper-dim"]}></div>
            </div>
        </div>
    )
}

export default AppWidget;