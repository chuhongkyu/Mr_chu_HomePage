import { TextGroup } from "@/components/common/page/container/ContentContainer";
import styles from "@/style/sub-page.module.scss";

const ContentOne = () => {
  return (
    <div className={styles["content"]}>
        <TextGroup>
            <div className="title">
              1인 개발의 여정
            </div>
            <div className="description">
              2021년에 게임 개발을 시작했습니다.
              여러 게임 툴들을 써봤었는데 Unity라는 툴이 무료이기도 하고 좋은 에셋들이 많았기 때문에 고르게 되었습니다.
              당시에는 개발 실력도 없었고 한국어로 되어 있는 좋은 개발 강의나 ChatGPT도 없었기 때문에 개발을 하다가 문제가 생겼을 때 어려움이 참 많았습니다. 
              문제가 발생하면 비슷한 사례의 해외 유튜브를 보거나 Stack Overflow에서 선배 개발자 분들의 답변들을 확인하며 개발을 진행했습니다. 
              <br/>
              <br/>
              1인 개발의 과정은 기획, 디자인, 개발을 모두 스스로 해결해야 하기에 어려운 점이 많았습니다. 
              게임의 아이디어를 떠올리고, 비주얼을 디자인하며, 코드를 작성하는 모든 단계에서 혼자 해결해야 했습니다. 
              이 경험은 체력적으로나 정신적으로 힘들었지만, 그만큼 많은 것을 배우고 성장할 수 있는 기회가 되었습니다.   
            </div>
        </TextGroup>
    </div>
  )
};

export default ContentOne;
