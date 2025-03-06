import WindowModal from "components/WindowModal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "components/about/Header";
import { CategoryItems, CategoryItem } from "components/about/CategoryItem";
import ContentContainer from "components/about/ContentContainer";
import { gameData } from "utils/categoryDatas";
import { MainContainer, LeftContainer, RightContainer } from "style/TwoContainerStyle";
import ContentOne from "components/others/ContentOne";
import ContentTwo from "components/others/ContentTwo";
import ContentThree from "components/others/ContentThree";


const Others = () => {
  const [currentSection, setSection] = useState(0);
  const rightContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [category, setCategory] = useState(gameData);
  const [title, setTitle] = useState("1인 개발");

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
        <LeftContainer color="rgb(121, 120, 120)">
          <CategoryItems>
            {category.map((item) => (
              <CategoryItem onClick={onClick} key={item.id} id={item.id} text={item.name} isActive={item.active}/>
            ))}
          </CategoryItems>
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
        </RightContainer>
      </MainContainer>
    </WindowModal>
  );
};

export default Others;

