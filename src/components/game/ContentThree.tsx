import TextGroup from "@/components/common/page/container/TextGroup";
import styles from "@/style/sub-page.module.scss";

const ContentThree = () => {
  return (
    <div className={styles["content"]}>
        <TextGroup>
            <h3 className="title">
              플랫폼들의 정책
            </h3>
            <h4 className="sub-title">App Tracking Transparency</h4>
            <div className="content-group">
              <img className="img-content" src="/assets/game/tracking.jpg" alt="tracking"/>
              <div className="description">
                <p>
                  애플은 2021년 iOS 업데이트를 통해, 앱이 사용자에게 &apos;앱 추적 허용&apos; 여부를 묻는 팝업을 반드시 표시하도록 요구했습니다. 
                  저처럼 무료 게임 앱을 운영하는 개발자들에게는 광고 수익이 주요 수입원인데, 저 역시 구글 애드몹을 사용해 유저에게 광고를 노출하고 보상을 제공하고 있습니다. 
                  그래서 이 &apos;앱 추적 허용&apos; 팝업을 추가하는 것은 필수적이었고, 이를 포함하지 않으면 앱을 업데이트할 수 없었습니다.
                </p><br/><br/>
                <p>
                  하지만 처음 이 요구사항이 도입되었을 때, 어떻게 구현해야 할지 막막했던 기억이 납니다. 
                  요즘은 유니티에서 iOS 14 광고 지원 기능을 제공해 쉽게 구현할 수 있지만, 당시에는 Xcode에서 직접 처리해야 했고, 개발자 커뮤니티인 스택오버플로우를 참고하며 다른 개발자들이 어떻게 해결했는지 찾아보며 작업을 진행했습니다. 
                  챗GPT 같은 도구도 없던 시절이라, 여러 번의 테스트와 시행착오를 거쳐야 했던 기억이 납니다.</p>
              </div>
            </div>
            
        </TextGroup>
    </div>
  )
};

export default ContentThree;
