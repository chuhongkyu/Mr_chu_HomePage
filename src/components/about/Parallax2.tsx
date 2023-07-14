import styled from "styled-components";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css"; 

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const ParallaxContainer = styled.div`
  margin-top: max(1.6667vw, 32px);
  overflow-x: hidden;
  width: 100%;
  height: max(21.8750vw, 380px);
  padding: 0 max(1.5625vw, 20px);
  .swiper-wrapper{
    width: 100%;
    .swiper-slide{
      width: 100%;
      border-radius: 25px;
      overflow: hidden;
      margin-right: 20px;
      height: max(21.8750vw, 380px);
      @media ${(props) => props.theme.device.mobile} {
        margin-right: 0px;
      }
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    padding: 0;
  }
`;

const ParallaxImage = styled(motion.a)`
    border-radius: 25px;
    width: 100%;
    height: max(21.8750vw, 380px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &::after{
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(0,0,0,0.05);
      content: '';
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    img{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Parallax2 = () => {
  return (
    <ParallaxContainer>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          // when window width is >= 768px
          1024: {
            slidesPerView: 3.2,
            spaceBetween:20,
          },
        }}
        >
        <SwiperSlide>
          <ParallaxImage
            >
            <img src={env.PUBLIC_URL + "/assets/img/about/insights_01.png"} alt="insight_01"/>
          </ParallaxImage>
        </SwiperSlide>
        <SwiperSlide>
          <ParallaxImage
            >
            <img src={env.PUBLIC_URL + "/assets/img/about/insights_02.png"} alt="insight_02"/>
          </ParallaxImage>
        </SwiperSlide>
        <SwiperSlide>
          <ParallaxImage
          >
            <img src={env.PUBLIC_URL + "/assets/img/about/map_01.png"} alt="map01"/>
          </ParallaxImage>
        </SwiperSlide>
        <SwiperSlide>
          <ParallaxImage
          >
            <img src={env.PUBLIC_URL + "/assets/img/about/map_02.png"} alt="map02"/>
          </ParallaxImage>
        </SwiperSlide>
      </Swiper>
    </ParallaxContainer>
  );
};

export default Parallax2;