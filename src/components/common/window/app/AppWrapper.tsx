"use client"

import AppLink from "@/components/common/window/app/AppLink";
import AddAppBtn from "./AddAppBtn";
import { appList } from "@/utils/appList";
import styles from "@/style/page.module.scss";
import { useState } from "react";
import { useAppContext } from "./AppContext";

const AppWrapper = ()=> {
    const { apps } = useAppContext();
    
    return(
      <div className={styles["app-container"]}>
        <div className={styles["app-wrapper"]}>
        {apps.map((app, index) => (
          <AppLink 
            key={index + "link-KEY"} 
            title={app.label} 
            color={app.color}
            pathUrl={`${app.name}`} 
            type={app.name}
            />
          ))
        }
        </div>
        {/* <AddAppBtn/> */}
      </div>
    )
}

export default AppWrapper;