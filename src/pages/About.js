import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import WindowModal from "../components/WindowModal";
import { write } from "../utils/write";
import ReactTooltip from "react-tooltip";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const MainContainer = styled.div`
  width: 100%;
  height: 96%;
  padding: 50px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  .title {
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 10px;
  }
  .description {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    p {
      color: rgb(180, 180, 180);
      margin-bottom: 10px;
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    padding: 50px 30px;
  }
`;

const Introduction = styled.div`
  width: 100%;
  margin-top: 5px;
`;

const MainText = styled.div`
  display: flex;
  font-size: 25px;
  span {
    margin-right: 10px;
  }
  h1 {
  }
`;

const Description = styled.div`
  margin: 10px 50px;
  font-size: 15px;
  margin-bottom: 40px;
  p {
  }
`;

const MainTextArray = [
  "관심 있는 개발 분야 소개",
  "개발자를 선택하게 된 이유",
  "다른 사람과 구별되는 나만의 강점",
  "성격의 장점과 단점",
];

const About = () => {
  return (
    <WindowModal bgColor="white">
      <MainContainer>
        <h1 className="title">자기소개</h1>
        <div className="description">
          <p>
            {write.introduction.substring(0, 53)}
            <br />
            {write.introduction.substring(53)}
          </p>
        </div>
        <Introduction>
          <MainText>
            <span>📌</span>
            <h1>{MainTextArray[0]}</h1>
          </MainText>
          <Description>
            <p>
              &nbsp; 개발 공부를 하면서 제일 관심이 있는 분야는 인터랙티브한
              홈페이지를 만드는 것 입니다. 코딩을 전문적으로 배우기 전에 미디어
              아트나 게임을 만들고는 했습니다. 프론트엔드가 유저에게 좋은 경험을
              선사하는 것은 작가가 그림을 전시하여 사람들로 하여금 좋은 추억을
              만들어 주는 것과 비슷하다고 생각합니다. 현재는 취미로 CSS, 3D모델,
              svg로 인터랙티브한 코딩 작업을 즐기고 있습니다. 무거운 이미지나
              모델들을 다뤄야 하니 최적화에도 신경을 쓰고 있습니다. 새로운
              훅이나 라이브러리를 보면 어떻게 하면 더 멋있는 동적인 페이지를
              만들 수 있을까 고민하게 됩니다. 그리고 그러한 고민이 재미가 있고
              그 원동력으로 다른 개발 분야도 공부하고 있습니다.
            </p>
          </Description>

          <MainText>
            <span>📌</span>
            <h1>{MainTextArray[1]}</h1>
          </MainText>
          <Description>
            <p>
              &nbsp; 미술 전공을 하면서 돈과 시간이 없어서 표현하지 못하는
              것들이 많았습니다. 그러나 생각보다 코딩을 하면서 컴퓨터 안에서
              스스로가 자유롭다는 생각이 들었습니다. 앞서 말한 인터랙티브한
              코딩이 정말 재밌어서 선택한 이유도 있지만 개발자라는 직업이 참
              멋있는 것 같습니다. 개발자들은 직장인이지만 자신의 발전 방향을
              골라서 회사를 정하기도 하고 문제를 자신의 도전과제로 여깁니다.
              또한 현업에 오래 계신 개발자들은 개발 문화를 좋게 하고자 계속
              고민해주시고 노력합니다. 깃허브의 설립부터 오픈소스로 공유를
              목적으로 이루어져 그런 것일까? 무언가 개발자라는 직업이 다른
              직업보다 팀원과 친근 하다고 생각합니다. 협업, 창의력이 중요하고
              무엇보다 실력이 중요하기에 직장인들 치고는 틀에 막혀 있지 않다고
              생각합니다. 깃허브를 이쁘게 꾸민 사람들이 많습니다. 저도
              오픈소스로 스킬들을 마크업 해주는 코드를 사용하고 있습니다.
              개발자로서 계속 나아가게 된다면 꼭 개발자들에게 이렇게 어떠한 작은
              코드를 사용해 비주얼적으로 깃을 꾸민다거나 방문자 수를 알려주는
              소스를 만들어 공유하고 싶습니다.
            </p>
          </Description>

          <MainText>
            <span>📌</span>
            <h1>{MainTextArray[2]}</h1>
          </MainText>
          <Description>
            <p>
              &nbsp; 사실 실무에서 실제로 일하고 계신 프론트 엔드를 만나 본 적이
              없기 때문에 제 장점을 비교하고 객관화하기에는 어려움이 있습니다.
              하지만 제 경험 안에서만 비교를 해본다면 CSS에 강점이 있습니다.
              회사에는 8년 차 개발자 PM 님이 계시지만 3월부터 8월이 되어가는
              지금까지 CSS 적인 부분은 PM 님을 포함하여 팀원들이 저에게 물어보고
              있습니다. 예시로 산책 코스 추천 홈페이지에서 스크롤을 내릴 때
              코스의 선이 스크롤에 맞춰서 이쁘게 선이 만들어지며 내려오는 것을
              만들다 던지, 빵집 홈페이지에서 마우스로 홈페이지를 클릭 시 빵
              그림이 랜덤하게 튀어나오게 하는 법을 구글 검색 없이도 저는 상상해
              낼 수 있었습니다. 어떤 분이 모달 창을 만드셨는데 버튼이 마지막
              요소만 클릭 되는 경우가 있었습니다. 그래서 자바스크립트 코드에
              문제가 있나 고민을 하셨지만 제가 확인해보니 요소들의 컴포넌트들이
              z-index가 동일하기 때문에 발생한 일 이였습니다. opacity로 요소들을
              숨기지말고 display: none으로 숨기라고 알려드려 해결 했습니다.
              노마드 코더의 챌린지라는 프로그램이 있습니다. 제가 챌린지에서
              우수작으로 통과를 하는 이유에는 코드를 잘짰던 것도 있겠지만
              디자인을 하는 CSS를 귀찮아 하지 않았기 때문이라고 생각합니다.
            </p>
          </Description>

          <MainText>
            <span>📌</span>
            <h1>{MainTextArray[3]}</h1>
          </MainText>
          <Description>
            <p>
              &nbsp; 글에서도 티를 냈을지 모르겠지만 저는 굉장히 말 앞에 전제를
              많이 붙입니다. 예를들어 누가 “사람은 처음부터 착해?, 나뻐?”이렇게
              묻는다면 “우리가 생각하는 ‘악’이 ‘악’이 맞다면 성악설이 맞아.”
              이렇게 대답할 것입니다. 이러한 저의 말하는 방식에 사람들은
              답답함을 많이 느끼는 것 같습니다. 제가 만약 누군가에게 일을 시키는
              사람이라면 “너가 할수 있다면 해” 이렇게 말을 할 수도 있다고
              생각합니다. 그러면 당사자는 “할수 없으면 안 해도 되나?” 이렇게
              생각하고 안 할 수도 있습니다. 이것은 회사 조직에서 안좋게 작용 할
              수 있습니다. 하지만 이러한 전제를 까는 것이 책임을 회피하려고
              이야기 하는 것은 아닙니다. 저는 객관적, 절대적인 것이 세상에 없고
              다 주관에 의해 만들어 진 것이라 생각합니다. 그래서 전제를 깔고
              말하고는 하지만 ’제가 만약 할 수 있다. 그렇다’ 이렇게 단호하게
              말하는 부분이 있다면 그 일을 무조건 해낼 것이고 책임감있게 완수 할
              것입니다.
            </p>
          </Description>
        </Introduction>
      </MainContainer>
    </WindowModal>
  );
};

export default About;
