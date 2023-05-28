import { motion } from "framer-motion";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import { AiFillMail } from "react-icons/ai";
import ProfileItem from "components/resume/ProfileItem";
import WindowModal from "components/WindowModal";
import Alert from "components/resume/Alert";

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
  font-family: "Noto Sans KR", sans-serif;
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
    border-bottom-left-radius: 10px;
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
  @media ${(props) => props.theme.device.tablet} {
    display: none;
    .profile {
      h2 {
        font-size: 15px;
      }
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    display: none;
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
  padding: 50px 30px 10px 30px;
  background-color: rgb(242, 242, 242);
  overflow-x: hidden;
  overflow-y: scroll;
  border-bottom-right-radius: 10px;
  font-family: "Noto Sans KR" sans-serif;
  h1 {
    display: block;
    text-align: left;
    font-family: "Montserrat", sans-serif;
    font-size: 42px;
    font-weight: bold;
    margin-bottom: max(1.2500vw, 1.5px);
  }
  @media ${(props) => props.theme.device.mac} {
    padding: 40px 30px 10px 30px;
    h1 {
      font-size: 40px;
      font-weight: bold;
    }
  }
  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    padding: 40px 10px 10px 10px;
    h1 {
      font-size: 30px;
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 100%;
    padding: 40px 10px 40px;
    h1 {
      font-size: 20px;
    }
  }
`;

const ProfileGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  /* margin-bottom: max(1.2500vw, 1.5px); */
  .between {
    display: flex;
    justify-content: space-between;
    p{
      height: 1.5rem;
      &:first-of-type{
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        white-space: normal;
        word-wrap: break-word;
      }
      &:last-of-type{
        display: block;
        white-space: nowrap;
      }
      
    }
    img {
      height: 25px;
    }
  }
  hr {
    margin: 10px 0px;
  }
  @media ${(props) => props.theme.device.mac} {
    gap: 10px;
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
  @media ${(props) => props.theme.device.tablet} {
    grid-template-columns: 1fr;
    gap: 7px;
    .between {
      img {
        height: 18px;
      }
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    grid-template-columns: 1fr;
    gap: 6px;
    .between {
      img {
        height: 15px;
      }
    }
  }
`;

const Resume = () => {
  const [alert, setAlert] = useState<boolean>(false);

  const onCopyier = (e: any) => {
    setAlert(!alert);
    navigator.clipboard.writeText("chuhongkyu@gmail.com");
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
            onClick={(e) => onCopyier(e)}
            whileHover={{
              backgroundPosition: "left bottom",
              color: "white",
              transition: { duration: 0.5, ease: "linear" },
            }}
          >
            <span>
              <AiFillMail />
            </span>
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
              <p>2022.03</p>
            </div>
            <div className="between">
              <p>더즈 인터랙티브 (프론트 엔드)</p>
              <p>2022.08</p>
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
                <img
                  alt="styled-components"
                  src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&amp;logo=styled-components&amp;logoColor=white"
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
                <img
                  alt="Next.js"
                  src="https://img.shields.io/badge/Next.js-000000?style=flat-square&amp;logo=Next.js&amp;logoColor=white"
                />
              </span>
            </div>
          </ProfileItem>
          <ProfileItem
            icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4d5.svg"
            title="프로젝트"
            row={"span 2"}
          >
            <div className="between">
              <p
                data-tip="JS,리액트,넥스트"
                data-text-color="white"
                data-background-color="darkred"
              >
                Mr.chu 홈페이지
              </p>
              <a onClick={e => e.preventDefault()}>
                <p>개인 프로젝트</p>
              </a>
            </div>
            <hr/>
            <div className="between">
              <p
                data-tip="JS"
                data-text-color="white"
                data-background-color="orange"
              >
                마포구 예쁜 카페 10선
              </p>
              <a target="blank_" href="https://chuhongkyu.github.io/Cafe_HomePage/">
                <p>마포구청</p>
              </a>
            </div>
            <div className="between">
              <p
                data-tip="리액트"
                data-text-color="white"
                data-background-color="skyblue"
              >
                마포 버디즈 소개 홈페이지
              </p>
              <a target="blank_" href="https://chuhongkyu.github.io/mapoCharacter/">
                <p>마포구청</p>
              </a>
            </div>
            <div className="between">
              <p
                data-tip="리액트"
                data-text-color="white"
                data-background-color="skyblue"
              >
                세컨드 라이프(헌 옷 수거 플랫폼)
              </p>
              <p>마포구청</p>
            </div>
            <hr />
            <div className="between">
              <p
                data-tip="Next.js"
                data-text-color="white"
                data-background-color="darkblue"
              >
                CASS 월드컵 프로젝트
              </p>
              <p>더즈 인터랙티브</p>
            </div>
            <div className="between">
              <p
                data-tip="JS"
                data-text-color="black"
                data-background-color="orange"
              >
                롯데백화점 리뉴얼 [PCW]
              </p>
              <p>더즈 인터랙티브</p>
            </div>
            <div className="between">
              <p
                data-tip="JS"
                data-text-color="black"
                data-background-color="orange"
              >
                롯데백화점 리뉴얼 [MOW]
              </p>
              <p>더즈 인터랙티브</p> 
            </div>
            <div className="between">
              <p
                data-tip="JS"
                data-text-color="black"
                data-background-color="orange"
              >
                롯데백화점 리뉴얼 앱 [AOS,IOS]
              </p>
              <p>더즈 인터랙티브</p> 
            </div>
            <div className="between">
              <p
                data-tip="JS"
                data-text-color="black"
                data-background-color="orange"
              >
                정관장 kgc 운용
              </p>
              <p>더즈 인터랙티브</p>
            </div>
            <div className="between">
              <p
                data-tip="JS"
                data-text-color="black"
                data-background-color="orange"
              >
                한국타이어 운용
              </p>
              <p>더즈 인터랙티브</p>
            </div>
            <hr />
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
