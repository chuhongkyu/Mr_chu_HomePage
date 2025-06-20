import styles from "@/style/sub-page.module.scss";
import TextGroup from "@/components/common/page/container/TextGroup";
import AnimatedWrapper from "@/components/common/page/container/AnimatedWrapper";
import AnimatedText from "@/components/common/page/container/AnimatedText";

const ContentFour = () => {
  return (
    <div className={styles["content"]}>
      <TextGroup>
            <AnimatedWrapper>
                <AnimatedText text="본인의 성장이 팀의 성장" el="h4" className="title"/>
            </AnimatedWrapper>
            <AnimatedWrapper className="description">
              2022년 마포구청 청년 일자리 사업단에서 근무할 때 프론트 3명과 리액트 스터디 주도해서 한 적이 있습니다. 방식은 (벨로퍼트 리액트) 강의 자료를 토대로 일주일에 두 번씩 실습한 코드를 서로 리뷰합니다. 또한 알게 된 점을 발표하고 서로 질의응답하는 시간을 가집니다. 이렇게 스터디를 해보면서 알게 된 점은 두 가지였습니다.
              <br/><br/>
              첫 번째는 학습 효과입니다. 발표를 해야 하는 책임감은 공부를 대충 할 수 없게 해주고 이해하지 못했던 부분들은 팀원들과 나누면서 알 수 있게 됩니다.
              <br/>두 번째는 선택과 집중입니다. 리액트뿐만 아니라 웹에 대해서도 아직 부족한 사람들끼리 모였기 때문에 사람들은 같은 강의 자료를 봐도 관심사가 다르게 공부해 온다는 것입니다. 이것은 폭이 넓어져서 단점일 수도 있겠지만 저한테는 전부 공부할 수 있게 되어 오히려 좋았습니다.
              <br/>
              이렇게 스터디를 같이 진행한 팀원들과 구청에서 두 가지 프로젝트를 나누어 진행할 때 프론트단 일을 잘 수행할 수 있었습니다.
            </AnimatedWrapper>
            <AnimatedWrapper className="description">
              더즈인터랙티브 회사를 다니면서도 주말에 three.js로 마리오 “개발자의 삶”이라는 프로젝트를 진행하였습니다. n년차를 주사위로 고르고 다음 페이지에서 n년차를 url파라미터로 받아서 마리오 캐릭터를 마우스로 움직이면서 개발자의 삶을 탐험하며 버섯을 3개 모으는 인터랙티브한 페이지입니다. 간단한 로직이었지만 좋은 기회로 패스트 캠퍼스에서 react-three-fiber 강의 제의를 받았습니다. 처음에는 부족한 제가 강의를 해도 되나 걱정이 많았습니다. 
              <br/><br/>
              그 걱정을 없애기 위해서 잘 모르는 부분을 공부하고 발표자료를 만들고 코드의 순서를 나누다 보니 더 좋은 개발자로 한걸음 나아갈 수있게 된것 같습니다. 그리고 알게된 지식들을 사람들에게 언제나 나누었습니다. 이러한 과정은 제가 회사를 다니면서 강의 준비를 하면서도 팀내에 긍정인 영향을 끼치게 하였습니다.
            </AnimatedWrapper>
        </TextGroup>
    </div>
  )
};

export default ContentFour;