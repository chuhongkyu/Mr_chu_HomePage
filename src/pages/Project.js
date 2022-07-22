import { useState } from "react";
import styled from "styled-components";
import WindowModal from "../components/WindowModal";
import { motion } from "framer-motion";
import { AiTwotoneCrown } from "react-icons/ai";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  font-family: "Gill Sans", "Gill Sans MT", "Trebuchet MS", sans-serif;
`;

const Title = styled.h1`
  white-space: nowrap;
  font-size: 35px;
  font-weight: 800;
  margin-bottom: 2rem;
  img {
    width: 25px;
    margin-right: 10px;
  }
  @media ${(props) => props.theme.device.mac} {
    margin-bottom: 1rem;
  }
`;

const MyStory = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  background-color: rgb(242, 242, 242);
`;

const Modal = styled(motion.div)`
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.device.mac} {
    height: 500px;
  }
`;

const Works = styled(motion.div)`
  width: 100%;
  height: 700px;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 3rem;
  .container {
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-direction: column;
    margin-right: 50px;
    .icon {
      width: 30px;
    }
    h1 {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    h6 {
      font-size: 20px;
      font-weight: 600;
      color: rgba(108, 117, 125, 0.8);
      margin-bottom: 40px;
      text-align: end;
    }
    h3 {
      font-size: 25px;
    }
    img {
      width: 100%;
      height: auto;
      border: 2px solid black;
    }
    hr {
      margin-top: 5px;
      margin-bottom: 5px;
    }
    p {
    }
    table {
      width: 100%;
      white-space: nowrap;
      th {
        text-align: start;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  @media ${(props) => props.theme.device.mac} {
    height: 500px;
    .container {
      h1 {
        margin-bottom: 5px;
      }
      h6 {
        margin-bottom: 10px;
      }
    }
  }
`;

const Accordion = styled.div`
  position: absolute;
  bottom: -250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleContainer = styled(motion.div)`
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  @media ${(props) => props.theme.device.mac} {
    width: 400px;
    height: 400px;
  }
`;

const SmallContainer = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: #eef2f5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 60;
  .line {
    width: 500px;
    height: 500px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      position: absolute;
      width: 100%;
      height: 3px;
      background: linear-gradient(to left, #d5d6d7 50%, transparent 50%);
    }
  }
  @media ${(props) => props.theme.device.mac} {
    width: 200px;
    height: 200px;
    .line {
      width: 400px;
      height: 400px;
      span {
        position: absolute;
        width: 100%;
        height: 3px;
        background: linear-gradient(to left, #d5d6d7 50%, transparent 50%);
      }
    }
  }
`;

const PathPosition = styled.div`
  position: absolute;
  top: 0px;
  border-bottom: 270px solid transparent;
  border-top: 220px solid #eef1f4;
  border-left: 90px solid transparent;
  border-right: 90px solid transparent;
  transition: 0.5s;
  transform: rotateZ(-10deg);
  h5 {
    color: black;
    transform: translateY(-170px);
  }
  @media ${(props) => props.theme.device.mac} {
    border-bottom: 200px solid transparent;
    border-top: 200px solid #eef1f4;
    border-left: 68px solid transparent;
    border-right: 68px solid transparent;
    h5 {
      color: black;
      transform: translateY(-160px);
    }
  }
`;

const worksData = [
  {
    id: 0,
    name: "헌 옷 수거 플랫폼",
    date: "(2022.07)~ 현재 진행형",
    img: "/assets/works/3project.png",
    description:
      "옷을 수거 하여 리세일하는 플랫폼입니다. 프론트엔드 리드로서 환경설정, 로그인 페이지, 배너를 현재 구현 했습니다. 백에서 JWT를 받아와 쿠키에 refreshToken을 저장하고 Redux_toolkit을 활용하여 Store에 accessToken을 전역으로 관리합니다. ",
    point: ["로그인, 판매, 예약"],
    github: "https://github.com/Mapo-Project/SecondLife-frontend",
    skills: ["React"],
    people: "UI/UX 2명, 프론트 엔드 3명, 백엔드 1명",
  },
  {
    id: 1,
    name: "마포 버디즈",
    date: "2022.06 ~ 2022.07",
    img: "/assets/works/2project.png",
    description:
      "마포 버디즈 홈페이지, 버디즈는 우체통 캐릭터입니다. Email.js를 활용하여 닉네임과 Email을 입력시 행운의 편지가 메일로 전송됩니다. 귀여운 캐릭터와 일러스트를 스크롤 홈페이지로 감상이 가능합니다. 2022년 캐릭터 라이선싱 페어 전시 되었습니다.",
    point: ["상세 페이지", "Email 송신 시스템"],
    github: "https://chuhongkyu.github.io/mapoCharacter/",
    skills: ["React"],
    people: "캐릭터 디자인 5명, 프론트 엔드(1인 개발)",
  },
  {
    id: 2,
    name: "인터랙티브 코딩 취미",
    date: "(2022.03)",
    img: "/assets/works/cube.jpg",
    description:
      "자바스크립트와 CSS만으로 만든 인터랙티브 작업입니다. 첫번째 페이지에는 마우스를 따라 움직이는 귀여운 유령이 있습니다. 페이지에는 별이 랜덤으로 하늘에서 떨어집니다. 2번째 페이지는 회전하는 박스가 있습니다. 박스 가운데 빨간 점을 누르면 camera 시점이 변합니다.",
    point: ["마우스에 따라 돌아다니는 고스트", "회전하는 3D박스"],
    github: "https://chuhongkyu.github.io/Workspace_MaPo/",
    skills: ["바닐라 JS", "Html,css"],
    people: "개인 프로젝트",
  },
  {
    id: 3,
    name: "BMW",
    date: "2022.04",
    img: "/assets/works/bmw.jpg",
    description:
      "리액트와 Three 라이브러리를 활용하여 BMW모델을 인터랙티브하게 감상할 수 있게 하였습니다. 차체, 창문, 바퀴 색을 직접 변경하며 감상할 수 있습니다",
    point: ["모델 파츠 별로 색깔 변경 기능", "모델 회전"],
    github: "https://chuhongkyu.github.io/bmw-car/",
    skills: ["React", "three 라이브러리", "Blender"],
    people: "개인 프로젝트",
  },
  {
    id: 4,
    name: "넷플릭스",
    date: "2022.05",
    img: "/assets/works/chuflix.jpg",
    description: "리액트와 타입스크립트를 활용한 넷플릭스 클론코딩",
    point: ["영화,드라마 검색", "콘텐츠 상세 보기"],
    github: "https://chuhongkyu.github.io/chuflix/",
    skills: ["React", "TypeScript"],
    people: "(개인 프로젝트)",
  },
  {
    id: 5,
    name: "댓글앱",
    date: "2022.05",
    img: "/assets/works/comments.jpg",
    description: "리액트로 만든 댓글 앱",
    point: ["댓글 작성, 수정, 삭제, 체크"],
    github: "https://chuhongkyu.github.io/Comments_app/",
    skills: ["React"],
    people: "(개인 프로젝트)",
  },
  {
    id: 6,
    name: "마포구 이쁜 카페 소개 10선",
    date: "2022.05",
    img: "/assets/works/1project.png",
    description:
      "마포구 이쁜 카페 소개 10선, 코로나로 인해 경기 침체가 장기화되어 왔다. 그러나 이제는 거리 두기 제한이 풀렸다. 또한 실외 마스크 착용이 의무가 아니게 되었다. 여름을 맞이하여 마포구의 이동과 소비가 늘어날 것이다. 우리 마포구 또한 이러한 상황에 맞게 경제 활성화를 다시 일으켜야 한다. 우리나라에 커피 문화는 굉장히 크게 자리 잡고 있다. 바쁜 직장인들이 잠을 이겨내기 위해 마시는 것에서 부터 주말에 데이트를 하러 가서 까지 소비하고 있다. 현대인들은 어디에 놀러 가든지 카페에서 커피를 마실 시간을 필요로 하게 되었다. 이러한 사람들의 수요에 맞게 마포구에는 굉장히 이쁜 카페들이 줄줄이 생겨가고 있다. 마포구내 카페를 활용하여 유동인구를 늘리고 경제를 활성화 시켜보자. 마포구에 이쁜 카페에 놀러온 사람들은 커피만 마시고 떠나지 않는다. 주변에서 식사도 하고 구경을 하며 지역을 발전 시킬 것이다. ",
    point: ["카페 검색, 지도, 인터랙티브, 다크모드"],
    github: "https://chuhongkyu.github.io/Cafe_HomePage/",
    skills: ["javaScript"],
    people: "1인 개발 - 회사 프로젝트",
  },
  {
    id: 7,
    name: "댓글앱",
    date: "2022.06",
    people: "2022.03 (개인 프로젝트)",
    img: "/assets/works/comments.jpg",
    description: "리액트로 만든 댓글 앱",
    point: ["댓글 작성, 수정, 삭제, 체크"],
    github: "https://chuhongkyu.github.io/Comments_app/",
    skills: ["React"],
  },
  {
    id: 8,
    name: "마포 버디즈",
    date: "2022.06 ~ 2022.07",
    img: "/assets/works/2project.png",
    description: "마포 버디즈 홈페이지",
    point: ["상세 페이지", "Email.js"],
    github: "https://chuhongkyu.github.io/mapoCharacter/",
    skills: ["React"],
    people: "캐릭터 디자인 5명, 프론트 엔드(1인 개발)",
  },
];

const Project = () => {
  const [position, setPosition] = useState(0);
  const [degreed, setDeg] = useState(0);
  const onRotate = () => {
    setDeg(degreed + 40);
    setPosition(position + 1);
    if (degreed === 360 || position === 8) {
      setDeg(0);
      setPosition(0);
    }
  };
  return (
    <WindowModal bgColor="white">
      <MainContainer>
        <MyStory>
          <Title>
            <img
              src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4a1.svg"
              alt="아이디어"
            />
            MY PROJECT
          </Title>
          <Modal>
            {worksData.map((data) => (
              <>
                {position === data.id ? (
                  <Works
                    initial={{ opacity: 1 }}
                    animate={{
                      y: [500, 0],
                      x: [-500, 0],
                      rotate: [-80, 0],
                      opacity: [0, 1],
                      transition: { duration: 0.5, type: "spring" },
                    }}
                    key={data.id}
                    id={data.id}
                  >
                    <div className="container">
                      <h1>{data.name}</h1>
                      <h6>{data.date}</h6>
                      <img src={env.PUBLIC_URL + data.img} alt={data.name} />
                    </div>
                    <div className="container">
                      <p>{data.description}</p>
                      <hr />
                      <table>
                        <tr>
                          <th>
                            <AiTwotoneCrown style={{ marginRight: 5 }} />
                            주요 기능 :
                          </th>
                          <td>
                            {data.point.map((m, index) => (
                              <p key={index}>{m}</p>
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <AiTwotoneCrown style={{ marginRight: 5 }} />깃 허브
                            :
                          </th>
                          <td>
                            <a
                              href={data.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {data.github}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <AiTwotoneCrown style={{ marginRight: 5 }} />
                            기술 :
                          </th>
                          <td>
                            <tr>
                              {data.skills.map((m, index) => (
                                <p key={index}>{m}</p>
                              ))}
                            </tr>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <AiTwotoneCrown style={{ marginRight: 5 }} />
                            개발 :
                          </th>
                          <td>
                            <tr>{data.people}</tr>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </Works>
                ) : null}
              </>
            ))}
          </Modal>
        </MyStory>
        <Accordion>
          <CircleContainer>
            <PathPosition>
              <h5>{position}</h5>
            </PathPosition>
            <SmallContainer
              onClick={onRotate}
              animate={{ transform: `rotateZ(${degreed}deg)` }}
            >
              <div className="line">
                <span style={{ transform: "rotateZ(40deg)" }}></span>
                <span style={{ transform: "rotateZ(80deg)" }}></span>
                <span style={{ transform: "rotateZ(120deg)" }}></span>
                <span style={{ transform: "rotateZ(160deg)" }}></span>
                <span style={{ transform: "rotateZ(200deg)" }}></span>
                <span style={{ transform: "rotateZ(240deg)" }}></span>
                <span style={{ transform: "rotateZ(280deg)" }}></span>
                <span style={{ transform: "rotateZ(320deg)" }}></span>
                <span style={{ transform: "rotateZ(360deg)" }}></span>
              </div>
              <SmallContainer
                whileHover={{ backgroundColor: "#98aec4" }}
              ></SmallContainer>
            </SmallContainer>
          </CircleContainer>
        </Accordion>
      </MainContainer>
    </WindowModal>
  );
};

export default Project;
