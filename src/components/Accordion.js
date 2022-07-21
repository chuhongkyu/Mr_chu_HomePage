import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  position: absolute;
  bottom: -250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleContainer = styled(motion.div)`
  width: 500px;
  height: 500px;
  background-color: black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallContainer = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: white;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: relative;
  z-index: 99;
  display: flex;
  justify-content: center;
  .position {
    position: absolute;
    top: -50px;
    width: 100px;
    height: 50px;
    transition: 0.5s;
    color: white;
  }
`;

const Accordion = () => {
  const [degreed, setDeg] = useState(0);
  const onRotate = () => {
    setDeg(degreed + 40);
  };
  return (
    <Wrapper>
      <CircleContainer
        onClick={onRotate}
        animate={{ transform: `rotateZ(${degreed}deg)` }}
      >
        <SmallContainer>
          <div className="position">현재 위치</div>
        </SmallContainer>
      </CircleContainer>
    </Wrapper>
  );
};

export default Accordion;
