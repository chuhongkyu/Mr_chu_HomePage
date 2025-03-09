"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Calendar from "./Calendar";
import Menu from "./side/Menu";
import Clock from "./Clock";
import { useMediaQuery } from "react-responsive";
import styles from "@/style/page.module.scss";
import Logo from "./Logo";
import BarPanel from "./BarPanel";

function WindowBar() {
  const isMobile = useMediaQuery({
    query: '(min-width: 681px)'
  })

  const [slide, setSlide] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const onHandleSlide = () => setSlide(!slide);
  const onHandleCalendar = () => setCalendarOpen(!calendarOpen);

  if(!isMobile) return

  return (
    <>
      {slide ? <Menu /> : null}
      <motion.div 
        className={styles["bar-container"]}
        initial={{y: 50}} 
        animate={{y: 0}} 
        transition={{ease: "linear", delay: 0.5}}>
          <Logo onHandleSlide={onHandleSlide}/>
          <BarPanel/>
          <Clock onClick={onHandleCalendar}/>
      </motion.div>
      {calendarOpen ? <Calendar/> : null}
    </>
  );
}

export default WindowBar;
