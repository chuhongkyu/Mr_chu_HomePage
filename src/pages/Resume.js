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
  width: 25%;
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
      rgb(255, 255, 255) 90%,
      transparent 50%
    );
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: 0.5s;
    &:hover {
      transition: 0.5s;
    }
    h2 {
      font-size: 25px;
      font-weight: bold;
      letter-spacing: 4px;
      margin-top: 15px;
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    display: none;
  }
  @media ${(props) => props.theme.device.mac} {
    .profile {
      h2 {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 4px;
        margin-top: 20px;
      }
    }
  }
`;

const Face = styled.div`
  position: absolute;
  top: -100px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: url("${env.PUBLIC_URL}/assets/img/profile.jpg");
  background-position: center;
  background-size: cover;
  &:hover {
    transform: translateY(-5px);
    transition: 0.5s;
  }
  @media ${(props) => props.theme.device.mac} {
    top: -60px;
    width: 100px;
    height: 100px;
  }
`;

const Contact = styled(motion.span)`
  padding: 10px 20px;
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  span {
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media ${(props) => props.theme.device.mac} {
    padding: 5px 10px;
  }
`;

const MainContainer = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 50px 40px 10px 30px;
  background-color: rgb(242, 242, 242);
  overflow-x: hidden;
  overflow-y: scroll;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  h1 {
    font-size: 42px;
    font-weight: bold;
  }
  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    padding: 50px 10px 10px 10px;
    h1 {
      font-size: 30px;
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 100%;
    padding: 50px 10px 10px 10px;
    h1 {
      font-size: 20px;
    }
  }
  @media ${(props) => props.theme.device.mac} {
    padding: 40px 40px 10px 30px;
    h1 {
      font-size: 40px;
      font-weight: bold;
    }
  }
`;

const ProfileGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(200px, auto) minmax(200px, auto);
  gap: 15px;
  margin: 5px 10px;
  .between {
    display: flex;
    justify-content: space-between;
    img {
      height: 25px;
    }
  }
  hr {
    margin: 10px 0px;
  }
  @media ${(props) => props.theme.device.tablet} {
    grid-template-columns: 1fr;
    gap: 10px;
    .between {
      img {
        height: 20px;
      }
    }
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
  @media ${(props) => props.theme.device.mac} {
    .between {
      display: flex;
      justify-content: space-between;
      img {
        height: 20px;
      }
    }
    hr {
      margin: 5px 0px;
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
          <h2>?????????</h2>
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
        <h1>?????? RESUME</h1>
        <ProfileGrid>
          <ProfileItem
            icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f3eb.svg"
            title="Education"
          >
            <div className="between">
              <p>??????????????? ???????????? ?????????</p>
              <p>2012 ~ 2018</p>
            </div>
            <div className="between">
              <p>??????????????? ????????? ??????????????????</p>
              <p>??????</p>
            </div>
          </ProfileItem>
          <ProfileItem
            icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4bc.svg"
            title="Experience"
          >
            <div className="between">
              <p>Sticker Slime(ios, android) - 1?????????</p>
              <p>2021</p>
            </div>
            <div className="between">
              <p>?????? ?????? ????????? ?????????(??? ?????????)</p>
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
            title="?????? ??????"
            column={2 / -1}
            row={"span 2"}
          >
            <div className="between">
              <p
                data-tip="html/css ??????"
                data-text-color="black"
                data-background-color="orange"
              >
                ???????????? ????????????
              </p>
              <a target="blank_" href="https://nomadcoders.co/community">
                <p>????????? ??????</p>
              </a>
            </div>
            <div className="between">
              <p
                data-tip="js ??????"
                data-text-color="black"
                data-background-color="yellow"
              >
                ????????? JS??? ?????? ??? ?????????
              </p>
              <p>????????? ??????</p>
            </div>
            <div className="between">
              <p
                data-tip="SCSS"
                data-text-color="black"
                data-background-color="pink"
              >
                CSS Layout ????????? ?????????
              </p>
              <p>????????? ??????</p>
            </div>
            <div className="between">
              <p
                data-tip="React"
                data-text-color="black"
                data-background-color="skyblue"
              >
                React JS ??????????????????
              </p>
              <p>????????? ??????</p>
            </div>
            <hr />
            <div className="between">
              <p>???????????? ????????? ????????? : ??????</p>
              <p>?????????</p>
            </div>
            <div className="between">
              <p>?????? ????????? ???????????? ?????????</p>
              <p>?????????</p>
            </div>
            <div className="between">
              <p>???????????? ??? ????????? Git</p>
              <p>?????????</p>
            </div>
            <div className="between">
              <p>js : ???????????? ???????????? ?????????</p>
              <p>?????????????????? ??????</p>
            </div>
            <hr />
            <div className="between">
              <p>??????????????? ????????????: JS/TypeScript</p>
              <p>?????????</p>
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
