import { motion } from "framer-motion";
import styled from "styled-components";
import ProfileItem from "../components/ProfileItem";
import WindowModal from "../components/WindowModal";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

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

const PickItem = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  grid-row: span 2;
  h3 {
    font-size: 25px;
    margin-bottom: 30px;
  }
  div {
    display: flex;
    justify-content: space-between;
  }
  hr {
    margin: 5px 0px;
  }
`;

const Resume = () => {
  return (
    <WindowModal bgColor="white">
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
          <PickItem>
            <h3>수강 강의</h3>
            <div>
              <p>코코아톡 클론코딩</p>
              <p>노마드 코더</p>
            </div>
            <div>
              <p>바닐라 JS로 크롬 앱 만들기</p>
              <p>노마드 코더</p>
            </div>
            <div>
              <p>CSS Layout 마스터 클래스</p>
              <p>노마드 코더</p>
            </div>
            <div>
              <p>React JS 마스터클래스</p>
              <p>노마드 코더</p>
            </div>
            <hr />
            <div>
              <p>만들면서 배우는 리액트 : 기초</p>
              <p>진유림</p>
            </div>
            <div>
              <p>한입 크기로 잘라먹는 리액트 : 기초부터 실전</p>
              <p>이정환</p>
            </div>
            <div>
              <p>지옥에서 온 관리자 Git</p>
              <p>최주호</p>
            </div>
            <div>
              <p>자바스크립트 : 기초부터 실전까지 올인원</p>
              <p>코딩알려주는 누나</p>
            </div>
            <hr />
            <div>
              <p>김민태의 프론트엔드 아카데미: JavaScript/TypeScript</p>
              <p>김민태</p>
            </div>
          </PickItem>
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
    </WindowModal>
  );
};

export default Resume;
