import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Position = styled.div`
  width: 99vw;
  height: 95vh;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 5;
  display: flex;
  justify-content: center;
`;

const Modal = styled(motion.div)`
  width: 99vw;
  height: 95vh;
  border-radius: 10px;
  background-color: ${(props) => props.theme.black.darker};
  position: relative;
  z-index: 5;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    padding: 6px 10px;
    background-color: white;
    border-radius: 25px;
    margin: 0;
    font-weight: 800;
    &:hover {
      background-color: rgb(35, 134, 54);
      color: white;
    }
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const TopNav = styled.div`
  width: 100%;
  height: 30px;
  background: ${(props) => props.theme.white.gradient};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 4;
  top: 0;
`;

const TopNavBtn = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 5px;
  font-size: 6px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RedBtn = styled(TopNavBtn)`
  background-color: rgb(239, 65, 42);
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const YellowBtn = styled(TopNavBtn)`
  background-color: rgb(255, 212, 71);
`;

const GreenBtn = styled(TopNavBtn)`
  background-color: rgb(23, 206, 95);
`;

const ModalVariant = {
  inital: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 2,
    type: "spring",
  },
};

const gitOpenning = {
  start: {
    fill: "rgba(255,255,255,0)",
    pathLength: 0,
  },
  end: {
    fill: "rgba(255,255,255,1)",
    pathLength: 1,
    strokeWidth: 0,
    transition: { duration: 4 },
  },
};

const GitHub = () => {
  const navigate = useNavigate();
  const onExit = () => {
    navigate("/");
  };
  return (
    <Position>
      <Modal
        variants={ModalVariant}
        initial="inital"
        animate="animate"
        transition="transition"
      >
        <TopNav>
          <RedBtn onClick={onExit}>x</RedBtn>
          <YellowBtn>-</YellowBtn>
          <GreenBtn></GreenBtn>
        </TopNav>
        <GitContainer>
          <a
            href="https://github.com/chuhongkyu"
            target="_blank"
            rel="noreferrer"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="120px"
              height="120px"
            >
              {" "}
              <motion.path
                variants={gitOpenning}
                initial="start"
                animate="end"
                stroke="rgba(255,255,255, 0.8)"
                strokeWidth="1"
                d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"
              />
            </motion.svg>
            <span>Go Git Hub</span>
          </a>
        </GitContainer>
      </Modal>
    </Position>
  );
};

export default GitHub;
