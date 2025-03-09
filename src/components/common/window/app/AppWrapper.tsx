"use client"

import AppLink from "@/components/common/window/app/AppLink";
import AddAppBtn from "./AddAppBtn";
import { appList } from "@/app/utils/appList";
import styles from "@/style/page.module.scss";
import { useState } from "react";

const AppWrapper = ()=> {
    const [apps] = useState<string[]>(appList)
    
    return(
      <div className={styles["app-container"]}>
        <div className={styles["app-wrapper"]}>
        {apps.map((app, index) => (
          <AppLink key={index + "link-KEY"} title={app} pathUrl={`${app}`} type={app} />
          ))
        }
        </div>
        {/* <AddAppBtn/> */}
      </div>
    )
}

export default AppWrapper;