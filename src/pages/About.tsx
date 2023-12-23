import styled from "styled-components";
import WindowModal from "components/WindowModal";
import React, { useEffect, useRef, useState } from "react";
import Header from "components/about/Header";
import { CaegoryItems, CategoryItem } from "components/about/CategoryItem";
import ContentContainer from "components/about/ContentContainer";
import { aboutData } from "utils/aboutData";
import ContentOne from "components/about/ContentOne";
import ContentTwo from "components/about/ContentTwo";
import ContentThree from "components/about/ContentThree";
import ContentFour from "components/about/ContentFour";
import ContentFive from "components/about/ContentFive";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const MainContainer = styled.div`
  padding-top: 30px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  border-radius: 10px;
  position: relative;
  display: flex;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  @media ${(props) => props.theme.device.tablet} {
    padding-top: 40px;
  }
`;

const LeftContainer = styled.div`
  width: 22%;
  background: rgb(238,188,17);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  @media ${(props) => props.theme.device.tablet} {
    display: none;
  }
  picture{
    width: auto;
    height: 100%;
    object-fit: cover;
  }
  img{
    width: auto;
    height: 100%;
    object-fit: cover;
  }
  &::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: linear-gradient(-50deg, transparent, rgba(238,188,17,0.5) );
  }
`;

const RightContainer = styled.div`
  width: 78%;
  flex: 1;
  overflow-y: auto;
  padding-bottom: max(3.75vw, 32px);
  &::-webkit-scrollbar{
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #484848d5; /* 스크롤바의 색상 */
    background-clip: padding-box;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent /*스크롤바 뒷 배경 색상*/
  }
  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    padding: 0 20px;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
`;

const About = () => {
  const [currentSection, setSection] = useState(0);
  const rightContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [category, setCategory] = useState(aboutData);
  const [title, setTitle] = useState("간단한 소개");

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const activeIndex = category.findIndex((el) => el.id === target.id);
    const targetRef = categoryRefs.current[activeIndex];

    if (targetRef && rightContainerRef.current) {
      rightContainerRef.current.scrollTo({
        top: targetRef ? targetRef.offsetTop - 100 : 0,
        behavior: "smooth",
      });
    }
  };

  const autoChange = () => {
    setCategory(
      category.map((el) => (el.id === currentSection + "" ? { ...el, active: true } : { ...el, active: false }))
    );
  };

  useEffect(() => {
    setTitle(category[currentSection].name);
    console.log(categoryRefs)
  }, [category]);

  useEffect(() => {
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

    rightContainerRef.current?.addEventListener("scroll", onHandlScroll);

    return () => {
      rightContainerRef.current?.removeEventListener("scroll", onHandlScroll);
    };
  }, [currentSection]);

  return (
    <WindowModal bgColor="white">
      <MainContainer>
        <LeftContainer>
          <CaegoryItems>
            {category.map((item) => (
              <CategoryItem onClick={onClick} key={item.id} id={item.id} isActive={item.active}>
                {item.name}
              </CategoryItem>
            ))}
          </CaegoryItems>
        </LeftContainer>
        <RightContainer ref={rightContainerRef}>
          <Header title={title} icon={true} />
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
