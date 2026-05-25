import Chronicle from "@/components/about/Chronicle";
import AnimatedText from "@/components/common/page/container/AnimatedText";
import AnimatedWrapper from "@/components/common/page/container/AnimatedWrapper";
import TextGroup from "@/components/common/page/container/TextGroup";

import styles from "@/style/sub-page.module.scss";

const ContentOne = () => {
  return (
    <div className={styles["content"]}>
      <TextGroup>
        <AnimatedWrapper>
          <AnimatedText text="한줄 소개" el="h4" className="title" />
        </AnimatedWrapper>
        <AnimatedWrapper className="description">
          <span>
            개발자로 일하면서 기술적인 문제를 정말 잘 해결하는 사람도, 팀을
            훌륭하게 리드하는 매니저도 많이 만났어요.
            <br />
            그런 멋진 동료들을 보면서 자연스럽게 <b>나는 어떤 개발자인가?</b>
            라는 고민을 하게 되었어요.{" "}
          </span>
          <br />
          <span>
            저는 사용자에게 몰입감 있는 좋은 경험을 선사하고, 이를 통해 서비스의
            인게이지먼트를 높이는 ‘제품 개발자’로서 강점이 있다고 생각해요.
          </span>
        </AnimatedWrapper>
        <AnimatedWrapper>
          <Chronicle />
        </AnimatedWrapper>
      </TextGroup>
    </div>
  );
};

export default ContentOne;
