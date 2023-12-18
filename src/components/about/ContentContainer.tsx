import { motion } from "framer-motion";
import React, { RefObject, useEffect, useRef } from "react";
import styled from "styled-components";

interface IProps {
  id: string;
  children: React.ReactNode;
}

const Wrapper = styled(motion.div)`
  margin-bottom: 20px;
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
