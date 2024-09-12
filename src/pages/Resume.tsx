import ProfileItem from "components/resume/ProfileItem";
import WindowModal from "components/WindowModal";
import ProfileContainer from "components/resume/ProfileContainer";
import { MainContainer, ProfileGrid } from "style/ResumStyle";


const Resume = () => {
  return (
    <WindowModal bgColor="white">
      <ProfileContainer/>
      <MainContainer>
        <h1>✏️ RESUME</h1>
        <ProfileGrid>
          <ProfileItem
            icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4bc.svg"
            title="Jobs"
          >
            <div className="between"><p>(주) 아이리브 (프론트 엔드)</p><p>2024.09</p></div>
            <div className="between"><p>(주) 더즈인터랙티브 (프론트 엔드)</p><p>2022.08</p></div>
            <div className="between"><p>마포 청년 일자리 사업단(앱 개발팀)</p><p>2022.03</p></div>
          </ProfileItem>
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
            <div className="between"><a href="https://fastcampus.co.kr/dev_online_3dinteractive" target="_blank" rel="noreferrer noopener"><p>패스트 캠퍼스 (R3F 강사)</p></a><p>2023.10 ~</p></div>
            <div className="between"><p>Sticker Slime(ios, android) - 1인개발</p><p>2021.07 ~</p></div>
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
            title="Preferred Tools"
          >
            <div className="between">
              <span>
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
                <img
                  alt="JavaScript"
                  src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"
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
                  className="img-dark"
                  alt="tailwind"
                  src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=Tailwind%20CSS&logoColor=white"
                />
                <img
                  className="img-dark"
                  alt="styled-component"
                  src="https://img.shields.io/badge/styled%20components-DB7093?style=flat-square&logo=styled-components&logoColor=white"
                />
              </span>
            </div>
            <div className="between">
              <span>
                <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/>
              </span>
            </div>
            <div className="between">
              <span>
                <img
                  alt="Node.js"
                  src="https://img.shields.io/badge/Node.js-339933?logo=Node.js&logoColor=white"
                />
              </span>
            </div>
            <div className="between">
              <span>
                <img
                  alt="Unity"
                  src="https://img.shields.io/badge/Unity-5f5a5f?style=flat-square&logo=Unity&logoColor=white"
                />
              </span>
            </div>
          </ProfileItem>
        </ProfileGrid>
      </MainContainer>
    </WindowModal>
  );
};

export default Resume;
