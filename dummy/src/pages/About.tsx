import WindowModal from "components/WindowModal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "components/about/Header";
import { CategoryItems, CategoryItem } from "components/about/CategoryItem";
import ContentContainer from "components/about/ContentContainer";
import { aboutData } from "utils/categoryDatas";
import ContentOne from "components/about/ContentOne";
import ContentTwo from "components/about/ContentTwo";
import ContentThree from "components/about/ContentThree";
import ContentFour from "components/about/ContentFour";
import ContentFive from "components/about/ContentFive";
import { MainContainer, LeftContainer, RightContainer } from "style/TwoContainerStyle";


const About = () => {
  const [currentSection, setSection] = useState(0);
  const rightContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [category, setCategory] = useState(aboutData);
  const [title, setTitle] = useState("간단한 소개");

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const activeIndex = category.findIndex((el) => el.id === target.id);
    const targetRef = categoryRefs.current[activeIndex];

    if (targetRef && rightContainerRef.current) {
      rightContainerRef.current.scrollTo({
        top: targetRef ? targetRef.offsetTop - 100 : 0,
        behavior: "smooth",
      });
    }
  };

  const autoChange = useCallback(() => {
    setCategory(
      category.map((el) => (el.id === currentSection + "" ? { ...el, active: true } : { ...el, active: false }))
    );
  },[category, currentSection,]);

  useEffect(() => {
    setTitle(category[currentSection].name);

  }, [category, currentSection]);

  useEffect(() => {
    const currentRef = rightContainerRef.current;

    function onHandlScroll() {
      const scrollPosition = rightContainerRef.current ? rightContainerRef.current.scrollTop + 500 : 0;
      const sectionPositions = categoryRefs.current.map((ref) => (ref ? ref.offsetTop : 0));

      for (let i = 0; i < sectionPositions.length; i++) {
        const nextIndex = i + 1;
        if (scrollPosition >= sectionPositions[i] && scrollPosition < (sectionPositions[nextIndex] || Infinity)) {
          setSection(i);
          autoChange();
          break;
        }
      }
    }

    currentRef?.addEventListener("scroll", onHandlScroll);

    return () => {
      currentRef?.removeEventListener("scroll", onHandlScroll);
    };
  }, [currentSection, autoChange]);

  return (
    <WindowModal bgColor="white">
      <MainContainer>
        <LeftContainer>
          
        </LeftContainer>
        <RightContainer ref={rightContainerRef}>
          <Header title={title}/>
          <ContentContainer id={category[0].id} ref={(element)=>categoryRefs.current[0] = element}>
              <ContentOne/>
          </ContentContainer>
          <ContentContainer id={category[1].id} ref={(element)=> categoryRefs.current[1] = element}>
              <ContentTwo/>
          </ContentContainer>
          <ContentContainer id={category[2].id} ref={(element)=> categoryRefs.current[2] = element}>
            <ContentThree/>
          </ContentContainer>
          <ContentContainer id={category[3].id} ref={(element)=> categoryRefs.current[3] = element}>
            <ContentFour/>
          </ContentContainer>
          <ContentContainer id={category[4].id} ref={(element)=> categoryRefs.current[4] = element}>
            <ContentFive/>
          </ContentContainer>
        </RightContainer>
      </MainContainer>
    </WindowModal>
  );
};

export default About;
