import { TextGroup } from "components/about/ContentContainer";
import { motion } from "framer-motion";
import styled from "styled-components";

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
              플랫폼들의 정책
            </div>
            <div className="description">
              
            </div>
        </TextGroup>
    </Wrapper>
  )
};

export default ContentThree;
