"use client"

import { useRecoilValue } from "recoil";
import AppLink from "@/components/common/window/app/AppLink";
import AddAppBtn from "./AddAppBtn";
import { appList } from "@/app/utils/appList";
import styles from "@/style/page.module.scss";

const AppWrapper = ()=> {
    const apps = useRecoilValue(appList);
    return(
      <div className={styles["app-container"]}>
        <div className={styles["app-wrapper"]}>
        {apps.map((app, index) => (
          <AppLink key={index + "link-KEY"} title={app} pathUrl={`${app}`} type={app} />
          ))
        }
        </div>
        <AddAppBtn/>
      </div>
    )
}

export default AppWrapper;