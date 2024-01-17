import { motion } from "framer-motion";
import styled from "styled-components";
import Parallax2 from "./Parallax2";
import { TextGroup } from "./ContentContainer";

const Wrapper = styled(motion.div)`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const ContentThree = () => {
  return (
    <Wrapper>
        <TextGroup>
            <div className="title">
                성능 최적화
            </div>
            <div className="content type2">
                <div className="sub_title">
                    L사 백화점 리뉴얼 운영/구축
                </div>
                <div className="description">
                    실무에서 성능 향상 요구를 받은 것은 L사 백화점 운영때 였습니다.<br/>
                    구축 당시 webpack을 통해 js와 css파일을 압축한 적이 있었지만 아직도 메인의 초기 진입 속도는 매우 느렸습니다.
                    고객사의 요청은 정확했습니다. PageSpeed Insights에서 40프로인 노란색을 70프로 까지 만들어 달라는 것입니다.<br/>
                    그래서 PageSpeed Insights를 활용하여 성능을 체크하고 성능을 개선을 하게 되었습니다. 픽쳐 태그를 활용하여 이미지를 webp 파일로 변경하고 폰트 파일을 최적화 하여 woff2로 변경하였습니다. 또한 불필요한 코드들을 없애는 방식으로 개선해 갔습니다.
                    결국 아래 그림 처럼 성능을 70프로로 달성하게 되었습니다.
                </div>
            </div>
            <div className="content type2">
                <div className="sub_title">
                    CASSCOOL 카스 쿨 
                </div>
                <div className="description">
                    카스 쿨 프로젝트에서는 네이버 지도에 많은 양의 마크를 세워야 했습니다. 대량의 마크를 세워야 하기 때문에 지도는 버벅거리는 현상이 발생 했습니다.
                    지도에서 화면에 보여지는 위치에만 그리는 방법을 사용하였지만 그것만으로는 부족했습니다.<br/><br/>
                    그래서 조사를 하던 중 지도 시스템에 '마커 클러스팅'이라는 개념이 있다는 것을 알게 되었습니다.
                    '마커 클러스팅'은 지도 상에 마크업들이 여러 개가 있을 때 그룹화를 시켜서 사용자에게 보여주는 것입니다.
                    이 방법을 기획자와 팀장님께 제한하였고 네이버 지도 깃허브를 통해서 관련 js 파일을 확인하고 프로젝트에 적용시켰습니다.
                    이로 인해 지도의 버벅거림이 사라지고 카스 쿨 이벤트를 하는 매장을 찾으려는 사용자들에게 좋은 사용자 경험을 선사할 수 있게 되었습니다.
                </div>
            </div>
        </TextGroup>
        <Parallax2/>
    </Wrapper>
  )
};

export default ContentThree;