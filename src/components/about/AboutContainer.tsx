"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import ContentFive from "@/components/about/ContentFive";
import ContentFour from "@/components/about/ContentFour";
import ContentOne from "@/components/about/ContentOne";
import ContentTwo from "@/components/about/ContentTwo";
import ContentContainer from "@/components/common/page/container/ContentContainer";
import { aboutData } from "@/utils/categoryDatas";

import styles from "@/style/sub-page.module.scss";

const AboutContainer = () => {
  const [currentSection, setSection] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToSection = (id: string) => {
    const index = aboutData.findIndex((el) => el.id === id);
    const target = sectionRefs.current[index];
    const container = scrollRef.current;
    if (!target || !container) return;

    const targetTop = target.getBoundingClientRect().top;
    const containerTop = container.getBoundingClientRect().top;
    container.scrollTo({
      top: container.scrollTop + targetTop - containerTop - 20,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      let activeIndex = 0;
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const el = sectionRefs.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top - containerTop <= 60) {
          activeIndex = i;
        }
      }
      setSection(activeIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const setSectionRef = useCallback(
    (element: HTMLDivElement | null, index: number) => {
      sectionRefs.current[index] = element;
    },
    []
  );

  return (
    <div className={styles["about-page"]}>
      <header className={styles["chip-header"]}>
        <nav className={styles["chip-nav"]}>
          {aboutData.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${styles["chip"]} ${currentSection === index ? styles["chip-active"] : ""}`}
              whileTap={{ scale: 0.93 }}
            >
              {item.name}
            </motion.button>
          ))}
        </nav>
      </header>

      <div ref={scrollRef} className={styles["about-scroll"]}>
        {aboutData.map((item, index) => (
          <ContentContainer
            key={item.id}
            id={item.id}
            ref={(element) => setSectionRef(element, index)}
          >
            {index === 0 && <ContentOne />}
            {index === 1 && <ContentTwo />}
            {index === 2 && <ContentFour />}
            {index === 3 && <ContentFive />}
          </ContentContainer>
        ))}
      </div>
    </div>
  );
};

export default AboutContainer;
