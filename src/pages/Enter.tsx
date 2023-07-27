import { motion } from "framer-motion";
import styled from "styled-components";
import Title from "components/Title";
import { useRecoilState } from "recoil";
import { loginAtom } from "atoms";
import { setCookie } from "utils/helper";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Wrapper = styled(motion.section)`
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: rgba(0, 0, 0, 1);
  justify-content: flex-end;
  align-items: center;
`;

const LoginBox = styled.div`
  width: 1400px;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  .handle {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 20px;
    position: relative;
  }
  @media ${(props) => props.theme.device.mac} {
    width: 1000px;
  }
  
  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    padding-left: max(3.75vw, 24px);
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
    position: absolute;
    left: 0px;
    top: -65px;
    width: 50px;
    height: 50px;
  }
  @media ${(props) => props.theme.device.mobile} {
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
  exit: {
    background: "rgba(0, 0, 0, 0)",
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

const Enter = () => {
  const [login, setLogin] = useRecoilState<boolean>(loginAtom)
  const onHandleLogin = () => {
    setLogin(false);
    setCookie('login', 'false', 1);
  }
  return (
    <Wrapper variants={openVariants} initial="inital" animate="animate" exit="exit">
      <LoginBox >
        <span className="handle" onClick={onHandleLogin}>
          <Circle
            initial={{ y: 1 }}
            animate={{
              y: [ 1, -7, 1],
              transition: {
                delay: 1,
                duration: 0.3,
                type: "spring",
                bounce: 1,
                repeat: Infinity,
                repeatDelay: 2,
              },
            }}
            whileHover={{ y: -5 }}
            exit={{scale:[1.2,0],border: "none",transition: {type: "spring", duration: 0.8}}}
          />
          <Title />
        </span>
      </LoginBox>
    </Wrapper>
  );
};

export default Enter;
