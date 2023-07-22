import { lazy, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css"; 
import { IWorksArray, worksData} from "utils/worksData";
import styled from "styled-components";
import { motion } from "framer-motion";
import { isMobile } from 'react-device-detect';
import { Navigation } from "swiper";
import { Suspense } from "react";
import Loading from "components/Loading";


const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";


const Wrapper = styled(motion.div)`
  height: 100%;
  .swiper{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .swiper-slide{
      position: relative;
      width: 100%;
      height: 100%;
      transition: 300ms;
      display: flex;
    }
    .swiper-button-prev, .swiper-button-next {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      width: max(4.3vw, 24px);
      height: max(4.3vw, 24px);
      background: url('/assets/icons/navbtn.svg') 100% 100%/contain no-repeat;
      z-index: 33;
      opacity: 0.7;
      &:hover{
        opacity: 1;
        transition: 300ms opacity;
      }
    }
    .swiper-button-next {
        left: unset;
        right: 10px;
        transform: translateY(-50%) rotate(180deg);
    }
  }
  @media ${(props) => props.theme.device.tablet} {

  }
`

const LeftCard = styled(motion.a)`
    width: 35vw;
    height: 100vh;
    position: relative;
    background: #fff;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    transition: 100ms ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      width: 70vw;
      transition: 300ms 0.8s ease-in-out;
    }
    @media ${(props) => props.theme.device.tablet} {
      display: none;
    }
    @media ${(props) => props.theme.device.mobile} {
    }
`;

const RightCard = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding: max(4.1667vw, 4.8rem) max(4.1667vw, 4.8rem) max(4.1667vw, 4.8rem) max(4.1667vw, 4.8rem);
  overflow-y: auto;
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
  .badge{
    padding: 5px 12px;
    background: #333;
    border-radius: 25px;
    color: white;
    font-size: 1rem;
  }
  .card_title{
    color: #000;
    margin-top: 20px;
    .head{
      font-size: 18px;
      line-height: 150%;
      font-weight: 500;
      letter-spacing: -0.01em;
      display: block;  
      .people{
        margin-left: 10px;
      }
    }
    .desc{
      margin-top: 10px;
      font-size: 18px;
      line-height: 150%;
      font-weight: 500;
      letter-spacing: -0.01em;
      display: block;  
      white-space: pre-line;
    }
    .title{
        font-size: 45px;
        font-weight: 700;
        display: block;
        margin-bottom: 10px;
    }
    p{
      font-size: 18px;
      line-height: 150%;
      font-weight: 500;
      letter-spacing: -0.01em;
      display: block;
    }
    .link{
      margin-top: 2rem;
      display: block;
      font-size: 18px;
      line-height: 150%;
      font-weight: 600;
      letter-spacing: -0.01em;
    }
    .points{
      margin-top: 2rem;
    }
    .points,.skills{
      display: flex;
      font-size: 18px;
      line-height: 150%;
      font-weight: 600;
      letter-spacing: -0.01em;
      p{
        display: block;
        &:not(:last-of-type){
          margin-right: 5px;
        }
      }
    }
  }
  @media ${(props) => props.theme.device.mac} {
    .card_title{
      .head{
        font-size: 16px;
      }
      .desc{
        font-size: 16px;
      }
      p{
        font-size: 16px;
      }
      .link{
        font-size: 16px;
      }
      .points,.skills{
        font-size: 16px;
      }
    }
  }
  @media ${(props) => props.theme.device.tablet} {
    padding: 20px 20px 20px 20px;
    
  }
`

const LazyImgContainer = lazy(() => import('components/project/ImageDimmer'));


function ProjectSwiper(){
    const [datas, setDatas] = useState<IWorksArray>(worksData);

    useEffect(() => {
        setDatas(worksData);
    }, []);
    
    return(
      <Wrapper>
        <Swiper
            modules={[Navigation]}
            loop={true}
            onSlideChange={() => {}}
            onSwiper={(swiper) => console.log(swiper)}
            navigation
          >
            
              {datas.map((data, index)=>{
              return(
                <SwiperSlide 
                  key={data.id + index}>
                  {isMobile ? null : 
                  (<LeftCard  
                      id={data.id + ""}
                      href={data.link}
                      target="_blank"
                    >  
                    <Suspense fallback={<Loading/>}>
                      <LazyImgContainer imageUrl={env.PUBLIC_URL + data.img} alt={data.id + ""}/>
                    </Suspense>
                  </LeftCard>)}
                  <RightCard>
                      <span className="badge">{data.company}</span>
                      <div className="card_title">
                        <b className="title">{data.name}</b>
                        <p className="head">{data.date}<b className="people">{data.people}</b></p>
                        <p className="desc">{data.description}</p>
                        <span className="points">주요 기능 :&nbsp;{data.point.map((el)=>{
                          return <p key={el+""}>{el}</p>
                        })}</span>
                        <span className="skills">주요 스택 :&nbsp;{data.skills.map((el)=>{
                          return <p key={el+""}>{el}</p>
                        })}</span>
                        <span className="link">
                          <a href={data.link} target="_blank" rel="noreferrer">Link :&nbsp;{data.link}</a>
                        </span>
                      </div>
                  </RightCard>
                </SwiperSlide>
              )
            })}
            
          </Swiper>
        </Wrapper>
    )
}

export default ProjectSwiper;