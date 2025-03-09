import { motion, LayoutGroup} from "motion/react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import styled from "styled-components";

interface Props {
  first: string;
  second: string;
  third: string;
}

const Position = styled(motion.div)`
  width: 100%;
  height: calc(100vh - 40px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
`;

const Modal = styled(motion.div)<Props>`
  width: ${(props) => props.first};
  height: ${(props) => props.second};
  border-radius: 10px;
  position: ${(props) => props.third};
  top: 0;
  left: 0;
  z-index: 5;
  transition: 0.5s;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  display: flex;
  justify-content: center;
  @media ${(props) => props.theme.device.mobile} {
    height: 100vh;
  }
`;

const TopNav = styled(motion.div)`
  width: 100%;
  height: 30px;
  background: ${(props) => props.theme.white.gradient};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 5px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 4;
  top: 0;
  cursor: pointer;
  @media ${(props) => props.theme.device.tablet} {
    height: 40px;
    padding-left: 20px;
  }
`;

const TopNavBtn = styled(motion.div)`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
  @media ${(props) => props.theme.device.tablet} {
    width: 20px;
    height: 20px;
  }
`;

const RedBtn = styled(TopNavBtn)`
  background-color: rgb(239, 65, 42);
  svg{
    display: block;
    width: 9px;
    height: 9px;
  }
`;

const YellowBtn = styled(TopNavBtn)`
  background-color: rgb(255, 212, 71);
  @media ${(props) => props.theme.device.tablet} {
    display: none;
  }
`;

const GreenBtn = styled(TopNavBtn)`
  background-color: rgb(23, 206, 95);
  span{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 9px;
    height: 9px;
    img{
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
  @media ${(props) => props.theme.device.tablet} {
    display: none;
  }
`;

const ModalVariant = {
  inital: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring" },
  },
  exit: {
    scale: 0,
    transition: { duration: 0.5, type: "spring" },
  },
};

interface IWindow {
  children: ReactNode;
  bgColor: string;
  widthSize: string[];
  heightSize: string[];
  position: string[];
}

const WindowModal = ({
  children,
  bgColor,
  widthSize,
  heightSize,
  position,
}: IWindow) => {
  const [resize, setResize] = useState(false);
  const router = useRouter();

  const onExit = () => {
    router.push("/home");
  };
  const onHandleSize = () => {
    setResize(!resize);
  };

  return (
      <LayoutGroup>
        <Position 
          variants={ModalVariant}
          initial="inital"
          animate="animate"
          exit="exit"
          >
          <Modal
            first={resize ? widthSize[0] : widthSize[1]}
            second={resize ? heightSize[0] : heightSize[1]}
            third={resize ? position[0] : position[1]}
            style={{ backgroundColor: bgColor }}
          >
            <TopNav whileHover={{background:"linear-gradient(to bottom, #e8e7e7 , #a9a7a7)"}}>
              <RedBtn onClick={onExit}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 20L20 4" stroke="black" strokeWidth="1.8"/>
                <path d="M4 4L20 20" stroke="black" strokeWidth="1.8"/>
                </svg>
              </RedBtn>
              <YellowBtn onClick={onExit}></YellowBtn>
              <GreenBtn onClick={onHandleSize}>
                <span>
                  <img src="/assets/img/window.png" alt="window"/>
                </span>
              </GreenBtn>
            </TopNav>
            {children}
          </Modal>
        </Position>
      </LayoutGroup>
  );
};

WindowModal.defaultProps = {
  bgColor: "white",
  widthSize: ["80vw", "100vw"],
  heightSize: ["80vh", "calc(100vh - 40px)"],
  position: ["relative", "fixed"],
};

export default WindowModal;
