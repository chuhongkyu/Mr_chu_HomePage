import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Autoplay } from 'swiper/modules';
import "swiper/css"; 
import styles from "@/style/sub-page.module.scss";
import Image from "next/image";

const Parallax2 = () => {
  return (
    <div className={styles["parallax-container"]}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        spaceBetween={20}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          1024: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
        }}
      >
        <SwiperSlide>
          <motion.a 
            className={styles["parallax-image"]}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image fill src={"/assets/img/about/insights_01.jpg"} alt="insight_01"/>
          </motion.a>
        </SwiperSlide>
        <SwiperSlide>
          <motion.a 
            className={styles["parallax-image"]}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image fill src={"/assets/img/about/insights_02.jpg"} alt="insight_02"/>
          </motion.a>
        </SwiperSlide>
        <SwiperSlide>
          <motion.a 
            className={styles["parallax-image"]}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image fill src={"/assets/img/about/map_01.jpg"} alt="map01"/>
          </motion.a>
        </SwiperSlide>
        <SwiperSlide>
          <motion.a 
            className={styles["parallax-image"]}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image fill src={"/assets/img/about/map_02.jpg"} alt="map02"/>
          </motion.a>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Parallax2;