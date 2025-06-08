import TextGroup from "@/components/common/page/container/TextGroup";
import Chronicle from "@/components/about/Chronicle";
import styles from "@/style/sub-page.module.scss";
import AnimatedText from "@/components/common/page/container/AnimatedText";
import AnimatedWrapper from "../common/page/container/AnimatedWrapper";

const ContentOne = () => {
    return (
        <div className={styles["content"]}>
            <TextGroup>
                <AnimatedWrapper>
                    <AnimatedText text="😃 자기 주도 학습" el="h4" className="title"/>
                </AnimatedWrapper>
                <AnimatedWrapper className="description">
                   <p>안녕하세요~<br/>저는 자기 주도적으로 일하며 학습하는 개발자입니다. 웹 개발을 하기전에 유니티를 활용하여 1인 개발로 게임 앱을 출시한 경험이, 학습하는 습관을 길러 주었습니다. 이러한 자세는 회사안에서도 발생하는 문제에 대해 침착하게 대응하고 지속적인 성장을 추구하는 데 도움이 되었습니다.</p>
                </AnimatedWrapper>
                <AnimatedWrapper>
                    <AnimatedText text="활동" el="h5" className="sub-title"/>
                </AnimatedWrapper>
                <AnimatedWrapper>
                    <Chronicle/>
                </AnimatedWrapper>
            </TextGroup>
        </div>
    )
};

export default ContentOne;
