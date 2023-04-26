import React,{ useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css"; 
import { IWorksArray, worksData} from "utils/worksData";
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
    .swiper-slide{
      position: relative;
      .badge{
        position: absolute;
        z-index: 3;
        display: block;
        left: 20px;
        top: -10px;
        padding: 5px 12px;
        background: #333;
        border-radius: 25px;
        color: white;
        font-size: 1rem;
      }
    }
    
  }
  @media ${(props) => props.theme.device.mobile} {
    padding-left: 20px;
  }
`

const SmallCard = styled(motion.a)`
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
    &:hover{
      .card_title{
        display: none;
      }
    }
    .card_title{
        position: absolute;
        bottom: 24px;
        left: 24px;
        z-index: 2;
        font-weight: 600;
        color: #fff;
        .desc{
            font-size: 35px;
            display: block;  
            .people{
              margin-left: 10px;
            }
        }
        .title{
            font-size: 45px;
            font-weight: 700;
            display: block;
            margin-bottom: 10px;
        }
    }
    
    @media ${(props) => props.theme.device.mac} {
      width: 600px;
      height: 400px;
      .card_title{
        .desc{
          font-size: 30px;
          display: block;  
        }
        .title{
          font-size: 35px;
          font-weight: 700;
          display: block;
          margin-bottom: 10px;
        }
      }
    }
    /* @media ${(props) => props.theme.device.tablet} {
      width: 450px;
      height: 400px;
      .card_title{
        .desc{
          font-size: 30px;
          display: block;  
        }
        .title{
          font-size: 35px;
          font-weight: 700;
          display: block;
          margin-bottom: 10px;
        }
      }
    } */
    @media ${(props) => props.theme.device.mobile} {
      width: calc(100% - 20px);
      height: 400px;
      .card_title{
        p{
          font-size: 20px;
          display: block;  
        }
        b{
          font-size: 15px;
          font-weight: 700;
          display: block;
          margin-bottom: 6px;
        }
      }
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
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            onSlideChange={() => {}}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{

              1024: {
                slidesPerView: 2.2,  //브라우저가 1024보다 클 때
                spaceBetween: 50,
              },
            }}
          >
              {datas.map((data, index)=>{
              return(
                <SwiperSlide key={data.id + index}>
                  <span className="badge">
                        {data.company}
                  </span>
                  <SmallCard 
                      id={data.id + ""}
                      href={data.link}
                      target="_blank"
                      whileHover={{y:-5}}
                    >
                      
                      <div className="card_title">
                        <b className="title">{data.name}</b>
                        <p className="desc">{data.date}<b className="people">{data.people}</b></p>
                      </div>
                      <ImageDimmer imageUrl={env.PUBLIC_URL + data.img} alt={data.id + ""}/>
                  </SmallCard>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Wrapper>
    )
}

export default ProjectSwiper;