"use client"

import AppLink from "@/components/common/window/app/AppLink";
import AddAppBtn from "./AddAppBtn";
import { appList } from "@/utils/appList";
import styles from "@/style/page.module.scss";
import { useAppContext } from "./AppContext";

const AppWrapper = ()=> {
    const { apps } = useAppContext();
    
    return(
      <div className={styles["app-container"]}>
        <div className={styles["app-wrapper"]}>
          {apps.map((app, index) => (
            <AppLink 
              key={index + "link-KEY"} 
              type={app.type}
              imgSrc={app.imgSrc}
              label={app.label} 
              color={app.color}
              link={app.link} 
              name={app.name}
              />
            ))
          }
        </div>
        {/* <AddAppBtn/> */}
      </div>
    )
}

export default AppWrapper;