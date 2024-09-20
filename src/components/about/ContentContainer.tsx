import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

interface IProps {
  id: string;
  children: React.ReactNode;
}

const Wrapper = styled(motion.div)`
  margin-bottom: 20px;
  padding: 0 max(1.5625vw, 20px);
  @media ${(props) => props.theme.device.mobile} {
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

export const TextGroup = styled(motion.div)`
  padding: 0 50px;
  .title{
    font-size: max(1.6667vw, 32px);
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: -0.02em;
    padding: max(5.208vw, 80px) 0 30px;
  }
  .sub-title{
    font-size: max(1.25vw, 22px);
    font-weight: 500;
    line-height: 1.8;
    letter-spacing: -0.02em;
    padding-bottom: 20px;
  }
  .description{
    font-size: max(1.25vw, 16px);
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: -0.01em;
    text-align: left;
    margin-bottom: 20px;
    color: #333333;
    b{
      font-weight: 600;
      text-decoration: underline;
    }
    .app-icon{
      display: block;
      width: auto;
      height: auto;
    }
  }
  .content-group{
    display: flex;
    gap: 2rem;
  }
  .description-underline{
    display: block;
    border-left: 2px solid #000;
    padding-left: 1rem;
    text-decoration: underline;
    color: #515151;
  }
  .content{
    font-size: max(1.25vw, 22px);
    font-weight: 500;
    line-height: 1.8;
    letter-spacing: -0.02em;
    &:not(:last-of-type){
      padding-bottom: max(1.28vw, 30px);
    }
    &.type2{
        width: 100%;  
    }
  }
  .img-content{
    width: 300px;
    height: auto;
    object-fit: contain;
  }

  @media ${(props) => props.theme.device.mobile} {
    padding: 10px 0 0;
    .title{
        padding: 30px 0 20px;
    }
    .content{
        font-size: 16px;
        padding-bottom: 15px;
        text-align: left;
        &.type1{
            font-size: 16px;
            font-weight: 500;
            line-height: 1.5;
            letter-spacing: -0.02em;
            text-align: left;
            padding-bottom: 15px;
        }
        &.type2{
            padding : 0;
        }
    }
    .content-group{
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .img-content{
      width: 300px;
      height: auto;
    }
  }
`

const ContentContainer = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const { id, children } = props;

  return (
    <Wrapper id={id} ref={ref}>
      {children}
    </Wrapper>
  );
});

export default ContentContainer;
