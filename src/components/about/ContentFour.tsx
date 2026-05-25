import AnimatedText from "@/components/common/page/container/AnimatedText";
import AnimatedWrapper from "@/components/common/page/container/AnimatedWrapper";
import TextGroup from "@/components/common/page/container/TextGroup";

import styles from "@/style/sub-page.module.scss";

const ContentFour = () => {
  return (
    <div className={styles["content"]}>
      <TextGroup>
        <AnimatedWrapper>
          <AnimatedText
            text="본인의 성장이 곧 팀의 성장"
            el="h4"
            className="title"
          />
        </AnimatedWrapper>

        <AnimatedWrapper className="description">
          2022년 마포구청 청년 일자리 사업단에서 근무할 당시 프론트엔드 팀원
          3명과 함께 <b>React 스터디를 주도해서 진행한 경험</b>이 있어요.
          <br />
          벨로퍼트 React 강의 자료를 기반으로 일주일에 두 번씩 각자 실습한
          코드를 리뷰하고, 알게 된 점을 발표하며 서로 질의응답하는 방식으로
          진행했어요.
          <br />
          <br />
          이 과정을 통해 두 가지를 크게 느꼈어요.
          <br />첫 번째는 <b>학습 효과</b>였어요. 발표를 해야 한다는 책임감
          덕분에 더 깊게 공부하게 되었고, 혼자서는 이해하지 못했던 부분들도
          팀원들과 이야기를 나누며 자연스럽게 이해할 수 있었어요.
          <br />두 번째는 <b>선택과 집중</b>이었어요. 모두 같은 강의를 듣더라도
          관심 있게 보는 포인트가 달랐고, 덕분에 혼자 공부할 때보다 더 넓은
          시야로 다양한 내용을 접할 수 있었어요.
          <br />
          <br />
          이렇게 함께 성장한 팀원들과 이후 구청 프로젝트를 진행하면서 프론트엔드
          업무를 안정적으로 수행할 수 있었어요.
        </AnimatedWrapper>

        <AnimatedWrapper className="description">
          이후 더즈인터랙티브에 다니면서도 주말마다 Three.js 기반의
          <b>&lsquo;개발자의 삶&rsquo;</b>이라는 3D 인터랙티브 프로젝트를 개인적으로
          제작했어요.
          <br />
          n년차 개발자를 선택한 뒤 마리오 캐릭터를 직접 움직이며 개발자의 삶을
          탐험하는 콘텐츠였고, 이 프로젝트를 계기로 패스트캠퍼스에서
          react-three-fiber 강의 제의를 받게 되었어요.
          <br />
          <br />
          처음에는 부족한 제가 강의를 해도 될까 걱정도 많았어요. 하지만 강의를
          준비하면서 잘 모르는 부분들을 더 깊게 공부하고, 발표 자료와 코드
          흐름을 정리하는 과정 자체가 저를 더 성장하게 만들었다고 생각해요.
          <br />
          그리고 그 과정에서 얻은 지식들을 주변 사람들과 계속 나누려고
          노력했어요.
          <br />
          강의를 준비하고 스터디를 진행하면서 혼자 성장하는 것보다, 알게 된
          지식을 함께 나누고 서로 영향을 주는 과정이 더 큰 성장을 만든다는 걸
          느끼게 되었어요.
          <br />
          실제로 이런 과정들을 보며 팀장님께서도 긍정적으로 봐주셨고, 회사
          안에서도 자연스럽게 저에게 질문하거나 의견을 물어보는 경우가
          많아졌어요.
          <br />
          저는 이런 경험을 통해 개인의 성장이 결국 팀의 성장에도 좋은 영향을 줄
          수 있다고 생각하게 되었어요.
        </AnimatedWrapper>
      </TextGroup>
    </div>
  );
};

export default ContentFour;
