import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Autoplay } from 'swiper/modules';
import "swiper/css"; 
import styles from "@/style/sub-page.module.scss";
import Image from "next/image";

const Parallax = () => {
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
            href="https://chuhongkyu.github.io/interact_3D/"
          >
            <Image fill src={"/assets/img/about/01.jpg"} alt="Image_1"/>
          </motion.a>
        </SwiperSlide>
        <SwiperSlide>
          <motion.a 
            className={styles["parallax-image"]}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            target="_blank"
            href="https://mr-chu-car-web.netlify.app/"
          >
            <Image fill src={"/assets/img/about/04.jpg"} alt="Image_4"/>
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
            <Image fill src={"/assets/project/마포버디즈.jpg"} alt="Image_3"/>
          </motion.a>
        </SwiperSlide>
        <SwiperSlide>
          <motion.a 
            className={styles["parallax-image"]}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            target="_blank"
            href="https://match-fruits-mrchu.vercel.app/"
          >
            <Image fill src={"/assets/project/match-landscape.jpg"} alt="Image_4"/>
          </motion.a>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Parallax;