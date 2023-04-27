import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const ParallaxContainer = styled.div`
  perspective: 1000px;
  overflow-x: hidden;
  width: 100%;
  height: 500px;
`;

const ParallaxWrapper = styled(motion.div)`
  width: 130%;
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transform-style: preserve-3d;
`;

const ParallaxImage = styled(motion.a)`
    width: fit-content;
    height: fit-content;
    display: block;
    border: 1px solid rgba(0,0,0,.8);
    border-radius: 4px;
    overflow: hidden;
    img{
        display: block;
        width: 180px;
        height: 300px;
        object-fit: cover;
        transform-origin: center;
    }
`;

const ParallaxImageB = styled(ParallaxImage)`
    width: fit-content;
    height: fit-content;
    display: block;
    img{
        display: block;
        width: 380px;
        height: 230px;
        object-fit: cover;
        transform-origin: center;
    }
`;

const Parallax = () => {
  return (
    <ParallaxContainer>
      <ParallaxWrapper
        initial={{ x: -400 }}
        animate={{ x: [-400, 0 , -400]}}
        transition={{
          duration: 15,
          loop: Infinity,
          ease: "linear",
        }}
      >
        <ParallaxImageB
          target={"_blank"}
          href={"https://chuhongkyu.github.io/interact_3D/"}
          whileHover={{
            scale: 1.1,
            rotateX: 10,
            rotateY: 10,
            transition: { duration: 0.5 },
          }}
        >
          <img src={env.PUBLIC_URL + "/assets/img/about/01.png"} alt="Image 1"/>
        </ParallaxImageB>
        <ParallaxImageB
            target={"_blank"}
            href={"https://chuhongkyu.github.io/bmw-car/"}
            whileHover={{
                scale: 1.1,
                rotateX: -10,
                rotateY: -10,
                transition: { duration: 0.5 },
            }} >
              <img src={env.PUBLIC_URL + "/assets/img/about/04.png"} alt="Imag 4"/>
        </ParallaxImageB>
        <ParallaxImage
         target={"_blank"}
          href={"https://match-fruits-mrchu.vercel.app/"}
          whileHover={{
            scale: 1.1,
            rotateX: 10,
            rotateY: 10,
            transition: { duration: 0.5 },
          }}
        >
            <img src={env.PUBLIC_URL + "/assets/img/about/02.png"} alt="Image 3"/>
        </ParallaxImage>
        <ParallaxImageB
          target={"_blank"}
          href={"https://chuhongkyu.github.io/mapoCharacter/"}
          whileHover={{
            scale: 1.1,
            rotateX: -10,
            rotateY: -10,
            transition: { duration: 0.5 },
          }}
        >
            <img src={env.PUBLIC_URL + "/assets/img/about/03.gif"} alt="Image 3"/>
        </ParallaxImageB>
      </ParallaxWrapper>
    </ParallaxContainer>
  );
};

export default Parallax;