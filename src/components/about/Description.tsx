import { motion } from "framer-motion";
import styled from "styled-components";
import { write } from "utils/write";

const Wrapper = styled(motion.div)`
    .description {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        white-space: nowrap;
        p {
            color: rgb(180, 180, 180);
            margin-bottom: 10px;
        }
    }
`;

const Description = () => {
  return (
    <Wrapper>
        <div className="description">
          <p>
            {write.introduction.substring(
              0,
              write.introduction.indexOf("👋") + 2
            )}
            <br />
            {write.introduction.substring(
              write.introduction.indexOf("👋") + 2,
              write.introduction.indexOf(".")
            )}
            <br />
            {write.introduction.substring(write.introduction.indexOf(".") + 1)}
          </p>
        </div>
    </Wrapper>
  )
};

export default Description;
