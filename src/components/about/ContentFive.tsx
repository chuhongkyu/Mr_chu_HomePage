import { motion } from "framer-motion";
import styled from "styled-components";
import { TextGroup } from "./ContentContainer";
import Parallax from "./Parallax";

const Wrapper = styled(motion.div)`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const ContentFive = () => {
  return (
    <Wrapper>
        <TextGroup>
            <div className="title">
                3D 개발: 나의 여정
            </div>
            <div className="content type2">
                <div className="description">
                    저는 현대 미술 작업 활동을 할때 모델링과 3D 프린터를 다루기도 했습니다.
                    덕분에 예술대학 학생들에게 3D 프린터 강의를 한 경험이 있습니다.<br/>
                    또한 Unity를 활용하여 iOS와 Android 플랫폼에 3D 게임을 출시 했던 경험 있습니다.<br/>
                    그래서 웹 개발자로서 전환 이후에도 취미로 three.js 작업을 해오고 있었습니다. 그러던 와중에 온라인 강의 플랫폼에서 강사 제의가 왔고 3D 개발의 즐거움을 학생들에게 나눌 수 있게 되었습니다.
                </div>
            </div>
        </TextGroup>
        <Parallax/>
    </Wrapper>
  )
};

export default ContentFive;
