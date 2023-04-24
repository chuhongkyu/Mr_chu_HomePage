import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  max-width: 1200px;
  margin-bottom: 10px;
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
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
  h1 {
    font-size: max(3.1250vw, 40px);
    color: #000;
    line-height: 1.2;
    letter-spacing: -0.02em;
    font-weight: 600;
    display: block;
  }
`;


const GoogleDrive = styled(motion.a)`
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
`;

const Header = () => {
  return (
    <Wrapper>
        <div className="content">
            <h1>자기소개</h1>
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
        </div>
    </Wrapper>
  )
};

export default Header;
