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
        width: auto;
        height: 100%;
        object-fit: contain;
    }
`;

const Parallax = () => {
  return (
    <ParallaxContainer>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
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
            href={"https://chuhongkyu.github.io/interact_3D/"}
            >
            <img src={env.PUBLIC_URL + "/assets/img/about/01.png"} alt="Image_1"/>
          </ParallaxImage>
        </SwiperSlide>
        <SwiperSlide>
          <ParallaxImage
            target={"_blank"}
            href={"https://chuhongkyu.github.io/bmw-car/"}
          >
            <img src={env.PUBLIC_URL + "/assets/img/about/04.png"} alt="Image_4"/>
          </ParallaxImage>
        </SwiperSlide>
        <SwiperSlide>
          <ParallaxImage
            target={"_blank"}
            href={"https://chuhongkyu.github.io/mapoCharacter/"}
          >
            <img src={env.PUBLIC_URL + "/assets/works/buddies.gif"} alt="Image_3"/>
          </ParallaxImage>
        </SwiperSlide>
        <SwiperSlide>
          <ParallaxImage
            target={"_blank"}
            href={"https://match-fruits-mrchu.vercel.app/"}
          >
            <img src={env.PUBLIC_URL + "/assets/works/match-landscape.png"} alt="Image_4"/>
          </ParallaxImage>
        </SwiperSlide>
      </Swiper>
    </ParallaxContainer>
  );
};

export default Parallax;