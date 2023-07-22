import { motion } from "framer-motion";
import styled from "styled-components";
import WindowModal from "components/WindowModal";
import React, { useEffect, useRef, useState } from "react";
import Header from "components/about/Header";
import ContentOne from "components/about/ContentOne";
import ContentTwo from "components/about/ContentTwo";
import ContentThree from "components/about/ContentThree";
import ContentFour from "components/about/ContentFour";

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

  @media ${(props) => props.theme.device.tablet} {
    padding-top: 40px;
  }
`;


const LeftContainer = styled.div`
  width: 25%;
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

const CaegoryItems = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
`

const CategoryItem = styled.div`
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: ${({ isActive }:Category) => (isActive ? 'bold' : 'normal')};
  color: ${({ isActive }:Category) => (isActive ? 'black' : 'white')};
`;

const RightContainer = styled.div`
  width: 75%;
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
    name: "마포구청",
    active: false,
  },
  {
    id: "2",
    name: "성능 최적화",
    active: false,
  },
  {
    id: "3",
    name: "반응형 코딩에 대한 생각",
    active: false,
  }
]


const About = () => {
  const [currentSection, setSection] = useState(0)
  const rightContainerRef = useRef<HTMLDivElement | null>(null);
  const oneRef = useRef<HTMLDivElement | null>(null);
  const twoRef = useRef<HTMLDivElement | null>(null);
  const threeRef = useRef<HTMLDivElement | null>(null);
  const fourRef = useRef<HTMLDivElement | null>(null);
  const [category, setCategory] = useState(categories);
  const [title, setTitle] = useState("자기소개");

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const refs = [oneRef, twoRef, threeRef, fourRef];
    const activeIndex = category.findIndex(el => el.id === target.id);
    const targetRef = refs[activeIndex];

    if (targetRef && rightContainerRef.current) {
      rightContainerRef.current.scrollTo({
        top:  targetRef.current ? targetRef.current.offsetTop - 100 : 0,
        behavior: "smooth"
      });
    }
  }

  const autoChange = () => {
    setCategory(
      category.map((el)=> el.id === currentSection +"" ? { ...el, active: true } : { ...el, active: false } )
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
      const section4Position = fourRef.current ? fourRef.current.offsetTop : 0
      if (scrollPosition >= section1Position && scrollPosition < section2Position) {
        setSection(0);
        autoChange();
      } else if (scrollPosition >= section2Position && scrollPosition < section3Position) {
        setSection(1);
        autoChange();
      } else if (scrollPosition >= section3Position && scrollPosition < section4Position) {
        setSection(2);
        autoChange();
      } else {
        setSection(3);
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
          <CaegoryItems>
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
          </CaegoryItems>

          <picture>
            <source type="image/webp" srcSet={env.PUBLIC_URL + '/assets/img/about/left/03.webp'}/>
            <source type="image/jpeg" srcSet={env.PUBLIC_URL + '/assets/img/about/left/03.jpg'}/>
            <img src={env.PUBLIC_URL + '/assets/img/about/left/03.webp'} alt="3"/>
          </picture>
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
            <ContentThree/>
          </ContentContainer>
          <ContentContainer id="3" ref={fourRef}>
            <ContentFour/>
          </ContentContainer>
        </RightContainer>
      </MainContainer>
    </WindowModal>
  );
};

export default About;
