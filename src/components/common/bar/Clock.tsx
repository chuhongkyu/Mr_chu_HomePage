import { useEffect, useState } from "react";
import styles from "@/style/page.module.scss";

const Clock = ({onClick}:{onClick: ()=> void}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const time = setInterval(() => {
      setTime(new Date());
    }, 60000);
    
      return () => clearInterval(time);
  }, []);

  return(
    <button 
      onClick={onClick}
      className={styles["bar-date-wrapper"]}>
      <span className={styles["current-time"]}>
        {time.toLocaleTimeString().slice(0, -3)}
      </span>
    </button> 
  )
}

export default Clock;