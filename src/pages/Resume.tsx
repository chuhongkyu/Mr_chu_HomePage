import styled from "styled-components";
import ProfileItem from "components/resume/ProfileItem";
import WindowModal from "components/WindowModal";
import ProfileContainer from "components/resume/ProfileContainer";

const MainContainer = styled.div`
  width: 75%;
  height: 100%;
  padding: max(2.6042vw, 50px) max(1.5625vw, 20px) max(2.6042vw, 30px);
  background-color: rgb(242, 242, 242);
  overflow-x: hidden;
  overflow-y: scroll;
  border-bottom-right-radius: 10px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  letter-spacing: -0.03em;
  &::-webkit-scrollbar{
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #484848d5; /* 스크롤바의 색상 */
    background-clip: padding-box;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent /*스크롤바 뒷 배경 색상*/
  }
  h1{
    font-family: ${(props) => props.theme.fontFamily.Montserrat} ;
    margin-bottom: max(1.2500vw, 1.5px);
  }
  @media ${(props) => props.theme.device.mac} {
  }
  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
  }
`;

const ProfileGrid = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 1rem;
  /* margin-bottom: max(1.2500vw, 1.5px); */
  .between {
    display: flex;
    justify-content: space-between;
    line-height: 135%;
    &:not(:last-of-type){
      margin-bottom: 3px;
    }
    p{
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
  return (
    <WindowModal bgColor="white">
      <ProfileContainer/>
      <MainContainer>
        <h1>✏️ RESUME</h1>
        <ProfileGrid>
          <ProfileItem
            icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f3eb.svg"
            title="Education"
          >
            <div className="between"><p>중앙대학교 미술학부 한국화</p><p>2012 ~ 2018</p></div>
            <div className="between"><p>중앙대학교 대학원 뉴미디어아트</p><p>자퇴</p></div>
          </ProfileItem>
          <ProfileItem
            icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4bc.svg"
            title="Experience"
          >
            <div className="between"><p>Sticker Slime(ios, android) - 1인개발</p><p>2021</p></div>
            <div className="between"><p>마포 청년 일자리 사업단(앱 개발팀)</p><p>2022.03</p></div>
            <div className="between"><p>더즈 인터랙티브 (프론트 엔드)</p><p>2022.08</p></div>
            <div className="between"><a href="https://fastcampus.co.kr/dev_online_3dinteractive" target="_blank" rel="noreferrer noopener"><p>패스트 캠퍼스 (R3F 강사)</p></a><p>2023.10.16</p></div>
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
            title="구축 및 운영"
            row={"span 2"}
          >
            <div className="between">
              <a href="https://www.samsungactive.co.kr/main.do" target="_blank" rel="noreferrer noopener">
                <p
                  data-tip="React.js"
                  data-text-color="white"
                  data-background-color="blue"
                >
                  삼성액티브자산운용
                </p>
              </a>
              <p>더즈 인터랙티브</p>
            </div>
            <div className="between">
              <p
                data-tip="React.js"
                data-text-color="white"
                data-background-color="blue"
              >
                CASS COOL 프로젝트
              </p>
              <p>더즈 인터랙티브</p>
            </div>
            <div className="between">
              <a href="https://www.jungkwanjang.co.kr/" target="_blank" rel="noreferrer noopener">
              <p
                data-tip="JSP"
                data-text-color="black"
                data-background-color="red"
              >
                정관장 kgc 리브랜딩
              </p></a>
              <p>더즈 인터랙티브</p>
            </div>
            <div className="between">
              <a href="https://www.lotteshopping.com/main" target="_blank" rel="noreferrer noopener">
              <p
                data-tip="JS"
                data-text-color="black"
                data-background-color="orange"
              >
                롯데백화점 리뉴얼 [MOW][PCW]
              </p></a>
              <p>더즈 인터랙티브</p> 
            </div>
            <div className="between">
              <a href="https://play.google.com/store/apps/details?id=com.innov.lottecoupon&hl=ko&gl=US" target="_blank" rel="noreferrer noopener">
              <p
                data-tip="JS"
                data-text-color="black"
                data-background-color="orange"
              >롯데백화점 리뉴얼 앱 [AOS,IOS]
              </p></a>
              <p>더즈 인터랙티브</p> 
            </div>
            <div className="between">
              <p
                data-tip="Next.js"
                data-text-color="white"
                data-background-color="darkblue"
              >CASS 월드컵 프로젝트</p>
              <p>더즈 인터랙티브</p>
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
              <a target="_blank" href="https://chuhongkyu.github.io/Cafe_HomePage/" rel="noreferrer noopener">
                <p>마포구청</p>
              </a>
            </div>
            <div className="between">
              <a target="_blank" href="https://chuhongkyu.github.io/mapoCharacter/" rel="noreferrer noopener">
              <p
                data-tip="리액트"
                data-text-color="white"
                data-background-color="skyblue"
              >마포 버디즈 소개 홈페이지
              </p></a><p>마포구청</p>
            </div>
            <div className="between">
              <a target="_blank" href="https://mapo-project.github.io/SecondLife-frontend/" rel="noreferrer noopener">
              <p
                data-tip="리액트"
                data-text-color="white"
                data-background-color="skyblue"
              >세컨드 라이프(헌 옷 수거 플랫폼)
              </p></a><p>마포구청</p>
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
            <div className="between">
              <span><img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&amp;logo=MongoDB&amp;logoColor=white" alt="img"></img></span>
            </div>
          </ProfileItem>
        </ProfileGrid>
      </MainContainer>
    </WindowModal>
  );
};

export default Resume;
