import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Title from "../components/Title";

const Wrapper = styled(motion.section)`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: rgba(0, 0, 0, 1);
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  h1 {
    font-size: 40px;
    font-weight: 800;
    color: white;
  }
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: white;
`;

const openVariants = {
  inital: {
    opacity: 1,
  },
  animate: {
    opacity: 0.4,
    transition: {
      duration: 5,
    },
  },
};

const Enter = () => {
  return (
    <Wrapper variants={openVariants} initial="inital" animate="animate">
      <LoginBox>
        <Link to="home">
          <Circle></Circle>
          <h1>Mr_chu</h1>
          <Title />
        </Link>
      </LoginBox>
    </Wrapper>
  );
};

export default Enter;
