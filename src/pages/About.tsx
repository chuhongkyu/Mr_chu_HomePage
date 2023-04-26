import { motion } from "framer-motion";
import styled from "styled-components";
import WindowModal from "components/WindowModal";
import { write } from "utils/write";
import React, { useEffect, useRef, useState } from "react";
import Description from "components/about/Description";
import ContentOne from "components/about/ContentOne";
import ContentTwo from "components/about/ContentTwo";
import Header from "components/about/Header";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

interface Category {
  isActive: boolean;
}

const MainContainer = styled.div`
  font-family: "Maple_story";
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

  @media ${(props) => props.theme.device.mobile} {
    padding: 50px 20px;
    .title {
      h1 {
        font-size: 30px;
      }
    }
    .description {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      p {
        font-size: 11px;
        color: rgb(180, 180, 180);
        margin-bottom: 10px;
      }
    }
  }
`;

const Introduction = styled(motion.div)`
  width: 100%;
  margin: 0;
`;

const LeftContainer = styled.div`
  width: 300px;
  background: lightgray;
  padding: 20px;
`;

const CategoryItem = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: ${({ isActive }:Category) => (isActive ? 'bold' : 'normal')};
`;

const RightContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ContentContainer = styled(motion.div)`
  margin-bottom: 20px;
`;

const categories = [
  {
    id: "0",
    name: "자기소개",
    active: true,
  },
  {
    id: "1",
    name: "프론트 엔드",
    active: false,
  },
  {
    id: "2",
    name: "더미2",
    active: false,
  }
]

interface iCategory {
  id: string;
  name: string;
  active: boolean;
};


const About = () => {
  const [currentSection, setSection] = useState(0)
  const rightContainerRef = useRef<HTMLDivElement | null>(null);
  const oneRef = useRef<HTMLDivElement | null>(null);
  const twoRef = useRef<HTMLDivElement | null>(null);
  const threeRef = useRef<HTMLDivElement | null>(null);
  const [category, setCategory] = useState(categories);
  const [title, setTitle] = useState("자기소개");

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setCategory(
      category.map((el)=> el.id ===  target.id ? { ...el, active: true } : { ...el, active: false } )
    )
  }

  const autoChange = () => {
    setCategory(
      category.map((el)=> el.id == currentSection +"" ? { ...el, active: true } : { ...el, active: false } )
    )
  }

  useEffect(()=>{
    setTitle(category[currentSection].name)
  },[category])

  useEffect(()=>{
    function onHandlScroll(){
      const scrollPosition = rightContainerRef.current ? rightContainerRef.current.scrollTop + 500 : 0;
      const section1Position = oneRef.current ? oneRef.current.offsetTop : 0;
      const section2Position = twoRef.current ? twoRef.current.offsetTop : 0;
      const section3Position = threeRef.current ? threeRef.current.offsetTop : 0
      if (scrollPosition >= section1Position && scrollPosition < section2Position) {
        setSection(0);
        autoChange();
      } else if (scrollPosition >= section2Position && scrollPosition < section3Position) {
        setSection(1);
        autoChange();
      } else {
        setSection(2);
        autoChange();
      }
      console.log('현재 위치', currentSection)
    }

    // 스크롤 이벤트 리스너 등록
    rightContainerRef.current?.addEventListener('scroll', onHandlScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      rightContainerRef.current?.removeEventListener('scroll', onHandlScroll);
    };

  },[currentSection])

  return (
    <WindowModal bgColor="white">
      <MainContainer>
        <LeftContainer>
          {
            category.map((item)=>{
              return(
                <CategoryItem 
                  onClick={onClick}
                  key={item.id} 
                  id={item.id}
                  isActive={item.active}
                >
                  {item.name}
                </CategoryItem>
              )
            })

          }
        </LeftContainer>
        <RightContainer ref={rightContainerRef}>
          <Header title={title} icon={true}/>
          <ContentContainer id="0" ref={oneRef}>
            <ContentOne/>
          </ContentContainer>
          <ContentContainer id="1" ref={twoRef}>
            <ContentTwo/>
          </ContentContainer>
          <ContentContainer id="2" ref={threeRef}>
            <ContentOne/>
          </ContentContainer>
        </RightContainer>

        {/* <Header/>
        <Description/>

        <Introduction
          initial={{ y: 0 }}
          animate={{
            y: [50, 0],
            opacity: [0, 0.5, 1],
            transition: { duration: 0.5, delay: 0.8 },
          }}
        >
          <Content/>
        </Introduction> */}
      </MainContainer>
    </WindowModal>
  );
};

export default About;
