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
  }
  h1 {
    font-size: max(2.0833vw, 20px);
    color: #000;
    line-height: 1.2;
    letter-spacing: 0.02em;
    font-weight: 600;
    display: block;
  }
  @media ${(props) => props.theme.device.tablet} {
    padding: 0 10px;
    .content{
      width: 100%;
      padding: 10px 0;
    }
  }
`;


const GoogleDrive = styled(motion.a)`
    position: absolute;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    p {
      font-size: 11px;
    }
    img {
      width: 50px;
      height: auto;
    }
  @media ${(props) => props.theme.device.tablet} {
    display: none;
  }
`;

interface IData {
  title: string;
  icon: boolean;
}

const Header = (props:IData) => {
  const {title, icon} = props;
  return (
    <Wrapper>
        <div className="content">
            <h1>{title}</h1>
            {/* {icon ? 
            <GoogleDrive
              href="https://drive.google.com/file/d/1GBtYmWO3Dw3DPwlRyOvbq2YMOoeOr0Tm/view?usp=share_link"
              target="_blank"
              initial={{ y: 0, scale: 1 }}
              whileHover={{ y: -10, scale: 1.2 }}
            >
              <img
                  src="https://play-lh.googleusercontent.com/t-juVwXA8lDAk8uQ2L6d6K83jpgQoqmK1icB_l9yvhIAQ2QT_1XbRwg5IpY08906qEw=w480-h960-rw"
                  alt="drive"
              />
              <p>자기소개.pdf</p>
            </GoogleDrive> 
            : null } */}
            
        </div>
    </Wrapper>
  )
};

export default Header;
