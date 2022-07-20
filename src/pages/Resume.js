import { motion } from "framer-motion";
import styled from "styled-components";
import ProfileItem from "../components/ProfileItem";
import WindowModal from "../components/WindowModal";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import { AiFillMail } from "react-icons/ai";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const ProfileContainer = styled.div`
  position: relative;
  width: 30%;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent),
    url("${env.PUBLIC_URL}/assets/img/profile_bg.jpg");
  background-image: center;
  background-size: cover;
  background-position: bottom center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  transition: 0.5s;
  .dummy {
    width: 100%;
    height: 70%;
  }
  .profile {
    width: 100%;
    height: 30%;
    position: relative;
    background-position: top;
    background: linear-gradient(
      to top,
      rgb(242, 242, 242) 90%,
      transparent 50%
    );
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: 0.5s;
    &:hover {
      transition: 0.5s;
      /* background: rgba(242, 242, 242, 0.6); */
    }
    h2 {
      font-family: "YUniverse-B";
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 4px;
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    display: none;
  }
`;

const Face = styled.div`
  position: absolute;
  top: -70px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url("${env.PUBLIC_URL}/assets/img/profile.jpg");
  background-position: center;
  background-size: cover;
  &:hover {
    transform: translateY(-5px);
    transition: 0.5s;
  }
`;

const Contact = styled(motion.span)`
  padding: 5px 10px 5px 10px;
  color: ${(props) => props.theme.black.darker};
  border-radius: 25px;
  margin-top: 20px;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 600;
  transition: 0.5s;
  background: linear-gradient(100deg, black 50%, white 50%);
  background-size: 220% 100%;
  background-position: right bottom;
  cursor: pointer;
  display: flex;
  span {
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MainContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 50px;
  overflow-y: scroll;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  h1 {
    font-size: 40px;
    font-weight: bold;
  }
  h3 {
    font-size: 25px;
    margin-bottom: 30px;
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 95%;
    padding: 40px 0px 0px 10px;
    h1 {
      font-size: 20px;
    }
    h3 {
      font-size: 15px;
      margin-bottom: 5px;
    }
  }
`;

const ProfileGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  .between {
    display: flex;
    justify-content: space-between;
  }
  hr {
    margin: 5px 0px;
  }
  @media ${(props) => props.theme.device.tablet} {
  }
  @media ${(props) => props.theme.device.mobile} {
    grid-template-columns: 1fr;
    gap: 10px;
    .between {
      img {
        height: 18px;
      }
    }
  }
`;

const Resume = () => {
  const [alert, setAlert] = useState(false);
  const onCopy = (e) => {
    setAlert(!alert);
    e.clipboardData.setData("chuhongkyu@gmail.com");
    e.preventDefault();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);
  return (
    <WindowModal bgColor="white">
      <ProfileContainer>
        <div className="dummy"></div>
        <div className="profile">
          <Face />
          <h2>추홍규</h2>
          {alert ? <Alert /> : null}
          <Contact
            onClick={(e) => onCopy(e)}
            whileHover={{
              backgroundPosition: "left bottom",
              color: "white",
              transition: { duration: 0.5, ease: "linear" },
            }}
          >
            <span>
              <AiFillMail />
            </span>{" "}
            Contact Me
          </Contact>
        </div>
      </ProfileContainer>
      <MainContainer>
        <h1>✏️ RESUME</h1>
        <ProfileGrid>
          <ProfileItem
            icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f3eb.svg"
            title="Education"
          >
            <div className="between">
              <p>중앙대학교 미술학부 한국화</p>
              <p>2012 ~ 2018</p>
            </div>
            <div className="between">
              <p>중앙대학교 대학원 뉴미디어아트</p>
              <p>자퇴</p>
            </div>
          </ProfileItem>
          <ProfileItem
            icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4bc.svg"
            title="Experience"
          >
            <div className="between">
              <p>Sticker Slime(ios, android) - 1인개발</p>
              <p>2021</p>
            </div>
            <div className="between">
              <p>마포 청년 일자리 사업단(앱 개발팀)</p>
              <p>2022</p>
            </div>
          </ProfileItem>
          <ProfileItem
            icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/26cf-fe0f.svg"
            title="Front end"
          >
            <div className="between">
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
            <div className="between">
              <span>
                <img
                  alt="Sass"
                  src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"
                />
              </span>
            </div>
            <div className="between">
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
          <ProfileItem
            icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4d5.svg"
            title="수강 강의"
            column={2 / -1}
            row={"span 2"}
          >
            <div className="between">
              <p
                data-tip="html/css 기초"
                data-text-color="black"
                data-background-color="orange"
              >
                코코아톡 클론코딩
              </p>
              <a target="blank_" href="https://nomadcoders.co/community">
                <p>노마드 코더</p>
              </a>
            </div>
            <div className="between">
              <p
                data-tip="js 기초"
                data-text-color="black"
                data-background-color="yellow"
              >
                바닐라 JS로 크롬 앱 만들기
              </p>
              <p>노마드 코더</p>
            </div>
            <div className="between">
              <p
                data-tip="SCSS"
                data-text-color="black"
                data-background-color="pink"
              >
                CSS Layout 마스터 클래스
              </p>
              <p>노마드 코더</p>
            </div>
            <div className="between">
              <p
                data-tip="React"
                data-text-color="black"
                data-background-color="skyblue"
              >
                React JS 마스터클래스
              </p>
              <p>노마드 코더</p>
            </div>
            <hr />
            <div className="between">
              <p>만들면서 배우는 리액트 : 기초</p>
              <p>진유림</p>
            </div>
            <div className="between">
              <p>한입 크기로 잘라먹는 리액트 : 기초부터 실전</p>
              <p>이정환</p>
            </div>
            <div className="between">
              <p>지옥에서 온 관리자 Git</p>
              <p>최주호</p>
            </div>
            <div className="between">
              <p>자바스크립트 : 기초부터 실전까지 올인원</p>
              <p>코딩알려주는 누나</p>
            </div>
            <hr />
            <div className="between">
              <p>김민태의 프론트엔드 아카데미: JavaScript/TypeScript</p>
              <p>김민태</p>
            </div>
          </ProfileItem>

          <ProfileItem
            icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/26cf-fe0f.svg"
            title="Others"
          >
            <div className="between">
              <span>
                <img
                  alt="Unity"
                  src="https://img.shields.io/badge/Unity-5f5a5f?style=flat-square&logo=Unity&logoColor=white"
                />
              </span>
            </div>
            <div className="between">
              <span>
                <img
                  alt="Slack"
                  src="https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=Slack&logoColor=white"
                />
                <img
                  alt="Notion"
                  src="https://img.shields.io/badge/Notion-141414?style=flat-square&logo=Notion&logoColor=#000000"
                />
              </span>
            </div>
          </ProfileItem>
        </ProfileGrid>
      </MainContainer>
      <ReactTooltip />
    </WindowModal>
  );
};

export default Resume;
