import Parallax from "@/components/about/Parallax";
import AnimatedText from "@/components/common/page/container/AnimatedText";
import AnimatedWrapper from "@/components/common/page/container/AnimatedWrapper";
import TextGroup from "@/components/common/page/container/TextGroup";

import styles from "@/style/sub-page.module.scss";

const ContentFive = () => {
  return (
    <div className={styles["content"]}>
      <TextGroup>
        <AnimatedWrapper>
          <AnimatedText text="3D 개발: 나의 여정" el="h4" className="title" />
        </AnimatedWrapper>

        <AnimatedWrapper className="content type2">
          <div className="description">
            저는 지금도 웹에서 <b>3D 개발</b>을 계속하고 있어요.
            <br />
            단순히 기술 자체보다, 사용자들이 직접 상호작용하고 몰입할 수 있는
            경험을 만드는 과정에 가장 큰 즐거움을 느껴요.
            <br />
            <br />
            최근에는 <b>‘당근이네’ 서비스</b>에서 Three.js 기반 인터랙션과
            사용자 경험을 실제 서비스에 녹여내며 많은 사용자들이 사용하는 제품을
            만들어가고 있어요.
            <br />
            웹에서도 충분히 새로운 경험과 공간감을 전달할 수 있다고 믿고 있고,
            앞으로도 이런 인터랙티브한 제품들을 계속 만들고 싶어요.
            <br />
            <br />
            만약 이러한 경험과 방향성이 필요한 곳이 있다면 언제든 편하게 연락
            주세요 :)
          </div>
        </AnimatedWrapper>
      </TextGroup>

      <Parallax />
    </div>
  );
};

export default ContentFive;
