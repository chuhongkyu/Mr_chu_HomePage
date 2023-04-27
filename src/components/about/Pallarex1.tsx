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
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap : 50px;
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

const Pallarex1 = () => {
  return (
    <ParallaxContainer>
      <ParallaxWrapper>
        <ParallaxImage
          target={"_blank"}
          href={"https://chuhongkyu.github.io/mapoCharacter/"}
          whileHover={{
            scale: 1.1,
            rotateX: 10,
            rotateY: 10,
            transition: { duration: 0.5 },
          }}
        >
          <img src={"https://github.com/chuhongkyu/mapoCharacter/blob/main/public/assets/readme/01%20(1).jpg?raw=true"} alt="Image 1"/>
        </ParallaxImage>
        <ParallaxImage
          whileHover={{
            scale: 1.1,
            rotateX: 10,
            rotateY: 10,
            transition: { duration: 0.5 },
          }}
        >
            <img src={"https://github.com/chuhongkyu/mapoCharacter/blob/main/public/assets/readme/01%20(2).jpg?raw=true"} alt="Image 2"/>
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

export default Pallarex1;