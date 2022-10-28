import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Title from "../components/Title";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Wrapper = styled(motion.section)`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: rgba(0, 0, 0, 1);
  justify-content: flex-end;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 1000px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media ${(props) => props.theme.device.tablet} {
    width: 700px;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 500px;
    a {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      margin-left: 30px;
    }
  }
`;

const Circle = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("${env.PUBLIC_URL}/assets/img/mrchu.jpeg");
  background-position: center;
  background-size: cover;
  border: 2px solid white;
  margin-right: 20px;
  @media ${(props) => props.theme.device.tablet} {
    width: 90px;
    height: 90px;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
`;

const openVariants = {
  inital: {
    background: "rgba(0, 0, 0, 1)",
  },
  animate: {
    background: "rgba(0, 0, 0, 0.3)",
    transition: {
      duration: 5,
    },
  },
};

const Enter = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/home");
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Wrapper variants={openVariants} initial="inital" animate="animate">
      <LoginBox>
        <Link to="home">
          <Circle
            initial={{ y: 0 }}
            animate={{
              y: [0, -10, 5, -10, 5, 0],
              transition: {
                delay: 2,
                type: "spring",
                repeat: Infinity,
                repeatDelay: 1,
              },
            }}
            whileHover={{ y: -5 }}
          ></Circle>
          <Title />
        </Link>
      </LoginBox>
    </Wrapper>
  );
};

export default Enter;
