import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import "swiper/css"; 
import styles from "@/style/sub-page.module.scss";

const Parallax1 = () => {
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
            target="_blank"
            href="https://chuhongkyu.github.io/mapoCharacter/"
          >
            <img src={"https://github.com/chuhongkyu/mapoCharacter/blob/main/public/assets/readme/01%20(1).jpg?raw=true"} alt="Image_1"/>
          </motion.a>
        </SwiperSlide>
        <SwiperSlide>
          <motion.a 
            className={styles["parallax-image"]}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={"https://github.com/chuhongkyu/mapoCharacter/blob/main/public/assets/readme/01%20(2).jpg?raw=true"} alt="Image_2"/>
          </motion.a>
        </SwiperSlide>
        <SwiperSlide>
          <motion.a 
            className={styles["parallax-image"]}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            target="_blank"
            href="https://chuhongkyu.github.io/mapoCharacter/"
          >
            <img src={"/assets/img/about/03.gif"} alt="Image_3"/>
          </motion.a>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Parallax1;