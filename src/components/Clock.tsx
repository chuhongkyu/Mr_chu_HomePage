import { useEffect, useState } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const time = setInterval(() => {
          setTime(new Date());
        }, 60000);
        return () => clearInterval(time);
      }, []);

    return(
        <span className="current-time">{time.toLocaleTimeString().slice(0, -3)}</span>
    )
}

export default Clock;