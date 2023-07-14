import styled from "styled-components";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import { Autoplay } from "swiper";

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

const Parallax1 = () => {
  return (
    <ParallaxContainer>
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        breakpoints={{
          // when window width is >= 768px
          1024: {
            slidesPerView: 2.2,
            spaceBetween:20,
          },
        }}
        >
        <SwiperSlide>
          <ParallaxImage
            target={"_blank"}
            href={"https://chuhongkyu.github.io/mapoCharacter/"}
          >
            <img src={"https://github.com/chuhongkyu/mapoCharacter/blob/main/public/assets/readme/01%20(1).jpg?raw=true"} alt="Image_1"/>
          </ParallaxImage>
        </SwiperSlide>
        <SwiperSlide>
          <ParallaxImage
          >
              <img src={"https://github.com/chuhongkyu/mapoCharacter/blob/main/public/assets/readme/01%20(2).jpg?raw=true"} alt="Image_2"/>
          </ParallaxImage>
        </SwiperSlide>
        <SwiperSlide>
          <ParallaxImage
            target={"_blank"}
            href={"https://chuhongkyu.github.io/mapoCharacter/"}
          >
              <img src={env.PUBLIC_URL + "/assets/img/about/03.gif"} alt="Image_3"/>
          </ParallaxImage>
        </SwiperSlide>
      </Swiper>
    </ParallaxContainer>
  );
};

export default Parallax1;