import AnimatedText from "@/components/common/page/container/AnimatedText";
import AnimatedWrapper from "@/components/common/page/container/AnimatedWrapper";
import TextGroup from "@/components/common/page/container/TextGroup";

import styles from "@/style/sub-page.module.scss";

const ContentTwo = () => {
  return (
    <div className={styles["content"]}>
      <TextGroup>
        <AnimatedWrapper>
          <AnimatedText text="소통이란?" el="h4" className="title" />
        </AnimatedWrapper>
        <AnimatedWrapper className="description">
          어떻게 하면 소통을 잘할 수 있나요? 라는 질문에 대해서 예전에는
          논리적으로 설명을 잘하고, 상대방을 설득하는 것이 소통이라고
          생각했어요. <br />
          실제로 웹에이전시에 다니며 여러 고객사의 기획자, 디자이너분들과
          협업했고 소통이 잘 된다는 이야기도 자주 들었어요.
          <br />
          <br />
          하지만 여러 회사를 경험하면서 요즘은 생각이 조금 달라졌어요. 저는 이제{" "}
          <b>소통은 결국 &lsquo;적응&rsquo;에 가깝다</b>고 생각해요.
          <br />
          같은 IT 업계라고 해도 회사마다 사용하는 용어가 다르고, 팀마다 일하는
          방식과 피드백 문화도 전부 달랐어요.
          <br />
          슬랙 메시지를 쓰는 방식이나 의견을 이야기하는 분위기조차 다르다는 걸
          느꼈어요.
          <br />
          <br />
          그래서 지금은 내가 잘 설명하는 사람인가보다,
          <b>
            팀이 사용하는 언어와 분위기를 빠르게 이해하고 자연스럽게 맞춰갈 수
            있는 사람이 소통을 잘하는 사람
          </b>
          이라고 생각해요.
          <br />
          결국 우리는 모두 좋은 서비스를 만들기 위해 함께 일하고 있기 때문에,
          상대를 설득하기 전에 먼저 이해하고 적응하는 과정이 더 중요하다고
          느끼고 있어요.
        </AnimatedWrapper>
      </TextGroup>
    </div>
  );
};

export default ContentTwo;
