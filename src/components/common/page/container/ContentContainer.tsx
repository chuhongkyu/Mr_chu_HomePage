import { motion } from "motion/react";
import React from "react";
import styled from "styled-components";

interface IProps {
  id: string;
  children: React.ReactNode;
}

const Wrapper = styled(motion.div)`
  margin-bottom: 20px;
  padding: 0 max(1.5625vw, 20px);
  @media (max-width: 768px) {
    padding: 0;
  }
  ul{
    li{
      font-size: 14px;
      font-weight: 500;
      line-height: 1.5;
      letter-spacing: -0.02em;
      position: relative;
      color: #333333;
      &:not(:last-of-type){
        margin-bottom: 5px;
      }
    }
  }
`;

const ContentContainer = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const { id, children } = props;

  return (
    <Wrapper id={id} ref={ref}>
      {children}
    </Wrapper>
  );
});

export default ContentContainer;
