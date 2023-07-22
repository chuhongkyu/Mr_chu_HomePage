import styled from "styled-components"
import { AiFillMail } from "react-icons/ai";
import Alert from "components/resume/Alert";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Wrapper = styled.div`
  position: relative;
  width: 25%;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent),
    url("${env.PUBLIC_URL}/assets/img/profile_bg.jpg");
  background-size: cover;
  background-position: bottom center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  transition: 0.5s;
  font-family: "Noto Sans KR", sans-serif;
  .dummy {
    width: 100%;
    height: 70%;
  }
  .profile {
    width: 100%;
    height: 30%;
    position: relative;
    background-position: top;
    background: linear-gradient(
      to top,
      rgb(255, 255, 255) 90%,
      transparent 50%
    );
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: 0.5s;
    border-bottom-left-radius: 10px;
    &:hover {
      transition: 0.5s;
    }
    h2 {
      font-size: 25px;
      font-weight: bold;
      letter-spacing: 4px;
      margin-top: 15px;
    }
  }
  @media ${(props) => props.theme.device.mac} {
    .profile {
      h2 {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 4px;
        margin-top: 20px;
      }
    }
  }
  @media ${(props) => props.theme.device.tablet} {
    display: none;
    .profile {
      h2 {
        font-size: 15px;
      }
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    display: none;
  }
`;

const Face = styled.div`
  position: absolute;
  top: -100px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-image: url("${env.PUBLIC_URL}/assets/img/profile.jpg");
  background-position: center;
  background-size: cover;
  &:hover {
    transform: translateY(-5px);
    transition: 0.5s;
  }
  @media ${(props) => props.theme.device.mac} {
    top: -60px;
    width: 100px;
    height: 100px;
  }
`;

const Contact = styled(motion.span)`
  padding: 10px 20px;
  color: ${(props) => props.theme.black.darker};
  border-radius: 25px;
  margin-top: 20px;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 600;
  transition: 0.5s;
  background: linear-gradient(100deg, black 50%, white 50%);
  background-size: 220% 100%;
  background-position: right bottom;
  cursor: pointer;
  display: flex;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  span {
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media ${(props) => props.theme.device.mac} {
    padding: 5px 10px;
  }
`;


const ProfileContainer = () => {
    const [alert, setAlert] = useState<boolean>(false);
    const onCopyier = (e: React.MouseEvent<HTMLDivElement>) => {
        setAlert(!alert);
        navigator.clipboard.writeText("chuhongkyu@gmail.com");
        e.preventDefault();
    };

    useEffect(() => {
        const timer = setTimeout(() => { setAlert(false); }, 1500);
        return () =>  clearTimeout(timer);
    }, [alert]);

    return(
        <Wrapper>
            <div className="dummy"></div>
            <div className="profile">
                <Face />
                <h2>추홍규</h2>
                {alert ? <Alert /> : null}
                <Contact
                    onClick={onCopyier}
                    whileHover={{
                    backgroundPosition: "left bottom",
                    color: "white",
                    transition: { duration: 0.5, ease: "linear" },
                    }}
                >
                    <span><AiFillMail /></span>Contact Me
                </Contact>
            </div>
        </Wrapper>
    )
}

export default ProfileContainer