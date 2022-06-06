import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProfileItem from "../components/ProfileItem";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

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
  height: 30px;
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
  h2 {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 600;
  }
`;

const Face = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("${env.PUBLIC_URL}/assets/img/profile.jpg");
  background-position: center;
  background-size: cover;
  margin-top: 100px;
  &:hover {
    border: 2px solid white;
  }
`;

const Conact = styled(motion.span)`
  padding: 5px 10px;
  background-color: ${(props) => props.theme.white.darker};
  color: ${(props) => props.theme.black.darker};
  border-radius: 25px;
  margin-top: 20px;
`;

const MainContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 50px;
  h1 {
    font-size: 40px;
  }
`;

const ProfilGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
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

const Resume = () => {
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
          <h2>추홍규</h2>
          <Conact
            whileHover={{
              backgroundColor: "black",
              color: "white",
              transition: { duration: 0.5, ease: "linear" },
            }}
          >
            Conact Me
          </Conact>
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
                <p>Sticker Slime(ios, android) - 1인개발</p>
                <p>2021</p>
              </div>
              <div>
                <p>마포 청년 일자리 사업단(앱 개발팀)</p>
                <p>2022</p>
              </div>
            </ProfileItem>
            <ProfileItem title="Front end">
              <div>
                <span>
                  <img
                    alt="HTML5"
                    src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"
                  />
                  <img
                    alt="CSS3"
                    src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"
                  />
                </span>
              </div>
              <div>
                <span>
                  <img
                    alt="Sass"
                    src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"
                  />
                </span>
              </div>
              <div>
                <span>
                  <img
                    alt="JavaScript"
                    src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"
                  />
                  <img
                    alt="React"
                    src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"
                  />
                  <img
                    alt="TypeScript"
                    src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"
                  />
                </span>
              </div>
            </ProfileItem>
            <ProfileItem title="Others">
              <div>
                <img
                  alt="Unity"
                  src="https://img.shields.io/badge/Unity-5f5a5f?style=flat-square&logo=Unity&logoColor=white"
                />
              </div>
            </ProfileItem>
          </ProfilGrid>
        </MainContainer>
      </Modal>
    </Position>
  );
};

export default Resume;
