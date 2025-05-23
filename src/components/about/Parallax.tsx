import styled from "styled-components";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Autoplay } from 'swiper/modules';
import "swiper/css"; 

const ParallaxContainer = styled.div`
  margin-top: max(1.6667vw, 32px);
  overflow-x: hidden;
  width: 100%;
  height: max(21.8750vw, 380px);
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
        spaceBetween={20}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
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
            href={"https://mario-dev-life.vercel.app/"}
            >
            <img src={"/assets/img/about/01.jpg"} alt="Image_1"/>
          </ParallaxImage>
        </SwiperSlide>
        <SwiperSlide>
          <ParallaxImage
            target={"_blank"}
            href={"https://mr-chu-car-web.netlify.app/"}
          >
            <img src={"/assets/img/about/04.jpg"} alt="Image_4"/>
          </ParallaxImage>
        </SwiperSlide>
        <SwiperSlide>
          <ParallaxImage
            target={"_blank"}
            href={"https://chuhongkyu.github.io/mapoCharacter/"}
          >
            <img src={"/assets/project/마포버디즈.jpg"} alt="Image_3"/>
          </ParallaxImage>
        </SwiperSlide>
        <SwiperSlide>
          <ParallaxImage
            target={"_blank"}
            href={"https://match-fruits-mrchu.vercel.app/"}
          >
            <img src={"/assets/works/match-landscape.jpg"} alt="Image_4"/>
          </ParallaxImage>
        </SwiperSlide>
      </Swiper>
    </ParallaxContainer>
  );
};

export default Parallax;