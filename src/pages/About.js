import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileItem from "../components/ProfileItem";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Position = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled(motion.div)`
  width: 99vw;
  height: 95vh;
  border-radius: 10px;
  background-color: ${(props) => props.theme.white.lighter};
  position: relative;
  z-index: 5;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopNav = styled.div`
  width: 100%;
  height: 4%;
  background: ${(props) => props.theme.white.gradient};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  position: absolute;
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

const ProfilContainer = styled.div`
  width: 30%;
  height: 100%;
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.6),
      transparent
    ),
    url("${env.PUBLIC_URL}/assets/img/profile_bg.jpg");
  background-image: center;
  background-size: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const MainContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 50px;
`;

const ProfilGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
`;

const Face = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("${env.PUBLIC_URL}/assets/img/profile.jpg");
  background-position: center;
  background-size: cover;
  margin-top: 50px;
`;

const Conact = styled.span`
  padding: 5px 10px;
  background-color: ${(props) => props.theme.white.darker};
  color: ${(props) => props.theme.black.darker};
  border-radius: 25px;
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

const About = () => {
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
        <ProfilContainer>
          <Face />
          <h1>MR_CHU</h1>
          <Conact>Conact Me</Conact>
        </ProfilContainer>
        <MainContainer>
          <h1>Developer</h1>
          <ProfilGrid>
            <ProfileItem title="Education">
              <div>
                <p>중앙대학교 미술학부 한국화</p>
                <p>2012 ~ 2018</p>
              </div>
              <div>
                <p>중앙대학교 대학원 뉴미디어아트</p>
                <p>중퇴</p>
              </div>
            </ProfileItem>
            <ProfileItem title="Experience">
              <div>
                <p>중앙대학교 대학원 뉴미디어아트</p>
                <p>중퇴</p>
              </div>
            </ProfileItem>
          </ProfilGrid>
        </MainContainer>
      </Modal>
    </Position>
  );
};

export default About;
