"use client";

import styles from "@/style/page.module.scss";
import AppLink from "./AppLink";
import { widgetApps } from "./AppData";

const AppWidget = () => {
    return (
        <div className={styles["app-widget-container"]}>
            <div className={styles["widget-wrapper"]}>
                <div className={styles["widget-wrapper-dim"]}></div>
                <div className={styles["item-wrapper"]}>
                    {widgetApps.map((app, index) => (
                        <AppLink 
                            key={index + "link-KEY"} 
                            type={app.type}
                            imgSrc={app.imgSrc}
                            label={app.label} 
                            color={app.color}
                            link={app.link} 
                            name={app.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AppWidget;