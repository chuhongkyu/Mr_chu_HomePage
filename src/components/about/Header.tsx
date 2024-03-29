import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  width: 100%;
  padding: 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.16);
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  z-index: 2;
  .content{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    position: relative;
    h1{
      text-align: center;
    }
  }
  @media ${(props) => props.theme.device.tablet} {
    padding: 0 10px;
    .content{
      width: 100%;
      padding: 10px 0;
    }
  }
`;

interface IData {
  title: string;
}

const Header = (props:IData) => {
  const {title } = props;
  return (
    <Wrapper>
        <div className="content">
            <h1>{title}</h1>
        </div>
    </Wrapper>
  )
};

export default Header;
