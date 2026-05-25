import TextGroup from "@/components/common/page/container/TextGroup";

import styles from "@/style/sub-page.module.scss";

const ContentOne = () => {
  return (
    <div className={styles["content"]}>
      <TextGroup>
        <div className="title">1인 개발의 여정</div>

        <div className="description">
          2021년에 혼자 게임 개발을 시작했어요.
          <br />
          여러 게임 툴들을 사용해봤지만 당시에는 Unity가 무료이기도 했고, 사용할
          수 있는 에셋과 자료들이 많아서 선택하게 되었어요.
          <br />
          <br />
          그때는 지금처럼 좋은 한국어 강의나 ChatGPT 같은 AI 도구도 거의 없던
          시기였기 때문에 개발을 하다가 문제가 생기면 해외 유튜브 영상이나 Stack
          Overflow를 보며 하나씩 해결해나갔어요.
          <br />
          <br />
          1인 개발은 기획, 디자인, 개발을 모두 혼자 해결해야 했기 때문에 쉽지
          않았어요.
          <br />
          하지만 그 과정에서 단순히 코드를 작성하는 것을 넘어,
          <b>하나의 아이디어를 실제 제품으로 끝까지 만들어내는 경험</b>을 할 수
          있었어요.
          <br />
          <br />
          지금도 저는 새로운 것을 직접 만들고 구현하는 과정 자체에서 가장 큰
          즐거움을 느끼고 있어요.
        </div>
      </TextGroup>
    </div>
  );
};

export default ContentOne;
