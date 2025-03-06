import styled from "styled-components"
import Alert from "components/resume/Alert";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled.div`
  position: relative;
  width: 25%;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent), url("/assets/img/profile_bg.jpg");
  background-size: cover;
  background-position: bottom center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  @media ${(props) => props.theme.device.mac} {
  }
  @media ${(props) => props.theme.device.tablet} {
    display: none;
  }
`;

const DummyWrapper = styled.div`
  width: 100%;
  height: 65%;
`

const ProfileWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 35%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    margin-top: 85px;
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 4px;
    font-family: "Noto Sans KR", sans-serif;
  }
  @media ${(props) => props.theme.device.mac} {
    h2 {margin-top: 65px;}
  }
`

const Face = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  transform: translateY(-50%);
  border-radius: 50%;
  background-image: url("/assets/img/profile.jpg");
  background-position: center;
  background-size: cover;
  @media ${(props) => props.theme.device.mac} {
    width: 100px;
    height: 100px;
  }
`;

const Contact = styled(motion.span)`
  position: relative;
  padding: 0.8rem 1.4rem;
  color: ${(props) => props.theme.black.darker};
  border-radius: 25px;
  margin: 20px 0;
  text-align: center;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  font-weight: 500;
  font-size: 16px;
`;

const MailIcon = styled.div`
  margin-right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`


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
            <DummyWrapper/>
            <ProfileWrapper>
                <Face />
                <h2>추홍규</h2>
                <Contact 
                  onClick={onCopyier}
                  whileHover={{
                    transition: { duration: 0.5, easings: "easeInOut" },
                  }}
                >
                  <AnimatePresence mode="wait">
                    {alert ? <Alert /> : null}
                  </AnimatePresence>
                  <MailIcon>
                    <img src="/assets/img/mail.png" alt="mail"/>
                  </MailIcon>Contact me
                </Contact>
            </ProfileWrapper>
        </Wrapper>
    )
}

export default ProfileContainer