import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineClose, AiOutlineExpand } from "react-icons/ai";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Position = styled.div`
  width: 99vw;
  height: 95vh;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 10;
  display: flex;
  justify-content: center;
`;

const Modal = styled(motion.div)`
  width: ${(props) => props.first};
  height: ${(props) => props.second};
  border-radius: 10px;
  position: relative;
  z-index: 5;
  transition: 0.5s;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  display: flex;
  justify-content: center;
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
  font-size: 10px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const RedBtn = styled(TopNavBtn)`
  background-color: rgb(239, 65, 42);
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

const WindowModal = ({ children, bgColor }) => {
  const [resize, setResize] = useState(false);
  const navigate = useNavigate();
  const onExit = () => {
    navigate("/home");
  };
  const onHandleSize = () => {
    setResize(!resize);
  };

  return (
    <Position>
      <Modal
        first={resize ? "80vw" : "99vw"}
        second={resize ? "90vh" : "95vh"}
        variants={ModalVariant}
        initial="inital"
        animate="animate"
        transition="transition"
        style={{ backgroundColor: bgColor }}
      >
        <TopNav>
          <RedBtn onClick={onExit}>
            <AiOutlineClose />
          </RedBtn>
          <YellowBtn></YellowBtn>
          <GreenBtn onClick={onHandleSize}>
            <AiOutlineExpand />
          </GreenBtn>
        </TopNav>
        {children}
      </Modal>
    </Position>
  );
};

WindowModal.defaultProps = {
  bgColor: "white",
};

export default WindowModal;
