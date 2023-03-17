import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css"; 
import { AiTwotoneCrown } from "react-icons/ai";
import { IWorksArray, worksData } from "utils/worksData";
import styled from "styled-components";
import { motion } from "framer-motion";
import ImageDimmer from "components/project/ImageDimmer";


const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Wrapper = styled.div`
  width: 100%;
  .swiper{
    padding-top: 50px;
    padding-bottom: 50px;
  }
`

const SmallCard = styled(motion.div)`
    position: relative;
    width: 800px;
    height: 600px;
    background: #fff;
    border-radius: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    .card_title{
        position: absolute;
        bottom: 24px;
        left: 24px;
        z-index: 2;
        font-weight: 600;
        color: #fff;
        p{
            font-size: 35px;
            display: block;  
        }
        b{
            font-size: 45px;
            font-weight: 700;
            display: block;
            margin-bottom: 10px;
        }
    }
    @media ${(props) => props.theme.device.mac} {
      width: 600px;
      height: 400px;
    }
`;


function ProjectSwiper(){
    const [datas, setDatas] = useState<IWorksArray>(worksData);

    useEffect(() => {
        setDatas(worksData);
    }, []);
    
    return(
      <Wrapper>
        <Swiper
            spaceBetween={50}
            slidesPerView={2.2}
            centeredSlides={true}
            loop={true}
            onSlideChange={() => {}}
            onSwiper={(swiper) => console.log(swiper)}
          >
              {datas.map((data, index)=>{
              return(
                <SwiperSlide key={data.id + index}>
                  <SmallCard 
                      id={data.id + ""}
                  >
                      <div className="card_title">
                        <b>{data.name}</b>
                        <p>{data.date}</p>
                      </div>
                      <ImageDimmer imageUrl={data.img} alt={data.id + ""}/>
                  </SmallCard>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Wrapper>
    )
}

export default ProjectSwiper;