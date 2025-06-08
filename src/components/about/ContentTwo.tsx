import styles from "@/style/sub-page.module.scss";
import TextGroup from "@/components/common/page/container/TextGroup";
import AnimatedWrapper from "@/components/common/page/container/AnimatedWrapper";
import AnimatedText from "@/components/common/page/container/AnimatedText";

const ContentTwo = () => {
  return (
    <div className={styles["content"]}>
        <TextGroup>
            <AnimatedWrapper>
                <AnimatedText text="어떻게 하면 소통을 잘할 수 있나요?" el="h4" className="title"/>
            </AnimatedWrapper>
            <AnimatedWrapper className="description">
              아무래도 웹에이전시에 다녔던 저는 여러 고객사의 다양한 유형의 기획자, 디자이너분들과 소통을 한 경험이 많습니다. 그때마다 저는 소통이 잘 되는 사람으로 평가되는 것 같습니다. 하지만 누군가 저에게 &apos;어떻게 하면 소통을 잘할 수 있나요?&apos; 라고 물어본다면 어떻게 대답해야 할지 고민이 됩니다.
              그래서 질문에 대답하기 위해서 소통 관련 인프콘 컨퍼런스, it 서적 등을 참고하며 어떻게 하면 소통을 잘할 수 있는가?에 대해 고민해 봤습니다.<br/><br/>
              제가 내린 결론은 우리는 <b>&apos;문제 해결을 위해 모여서 일하고 있다&apos;</b>는 것을 기억해야한다는 것입니다.<br/><br/>
              기획자가 개발자에게 일을 더 많이 시키려고 기획을 추가하는 것이 아니고 디자이너가 개발자를 고생시키기 위해서 어려운 디자인을 하는 것이 아닙니다.
              모두 좋은 서비스를 만들기 위해서 나아가는 것입니다. 마찬가지로 개발자가 안된다고 말하는 이유는 하기 싫어서가 아니라 UX 적으로 기획적으로 이상하기 때문일 것입니다.
              그렇기 때문에 우리는 그것이 왜 안되는지 설명해 줄 수 있는 개발자가 되어야 합니다.<br/><br/>
              기획자의 요청에 맡게 변경하기가 어려운 개발이 있습니다. 그럴 때는 어려운 이유와 실행할시 걸리는 공수를 설명하고 다른 방향을 제시해야 합니다. 물론, 다른 방향을 제시할 수 없다면 일정을 잡고 침착하게 일을 진행해야 합니다.<br/><br/>
              기획자의 말뜻을 알아들을 수가 없을 때가 있습니다. 그럴 때 “00님 제가 이해한 바로는 7월 31일까지 프로젝트 상품 카테고리 추가 건 진행하고 개발서버에만 배포하는 것이 맞을까요?“재차 확인 요청하는 방식은 굉장히 유용하고 실수를 사전에 줄일 수 있습니다.
            </AnimatedWrapper>
       
        </TextGroup>
    </div>
  )
};

export default ContentTwo;
