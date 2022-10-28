import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import WindowModal from "../components/WindowModal";
import { write } from "../utils/write";
import { Fragment, useState } from "react";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const MainContainer = styled.div`
  font-family: "Maple_story";
  width: 100%;
  height: 100%;
  padding: 50px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  border-radius: 10px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    h1 {
      font-size: 40px;
      font-weight: 800;
    }
  }
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
  @media ${(props) => props.theme.device.mobile} {
    padding: 50px 20px;
    .title {
      h1 {
        font-size: 30px;
      }
    }
    .description {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      p {
        font-size: 11px;
        color: rgb(180, 180, 180);
        margin-bottom: 10px;
      }
    }
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

const Introduction = styled(motion.div)`
  width: 100%;
  margin: 0;
`;

const MainText = styled(motion.div)`
  width: 100%;
  display: flex;
  margin-top: 30px;
  font-size: 25px;
  font-weight: 700;
  padding: 1px;
  cursor: pointer;
  span {
    margin-right: 10px;
    user-select: none;
  }
  h1 {
    white-space: nowrap;
    color: rgb(180, 180, 180);
    pointer-events: none;
  }
  @media ${(props) => props.theme.device.mobile} {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 700;
    h1 {
      white-space: normal;
      color: rgb(180, 180, 180);
    }
  }
`;

const Description = styled(motion.div)`
  margin: 10px 30px;
  h2 {
    font-size: 20px;
    margin-bottom: 5px;
    margin-top: 10px;
  }
  p {
    color: rgba(50, 50, 50, 1);
    font-size: 18px;
    margin-bottom: 10px;
  }
  span {
    text-decoration: underline;
    margin-left: 10px;
    margin-right: 10px;
  }
  @media ${(props) => props.theme.device.mobile} {
    h2 {
      font-size: 18px;
    }
    p {
      color: rgba(50, 50, 50, 1);
      font-size: 11px;
      margin-bottom: 10px;
    }
  }
`;

const ReadMe = styled.a`
  padding: 5px 15px;
  background: linear-gradient(to right, black 50%, rgb(245, 220, 245) 50%);
  background-size: 200%;
  background-position: left center;
  color: white;
  &:hover {
    background-position: right center;
    color: black;
    transition: 0.5s;
  }
`;

const About = () => {
  const [pageShow, setPageShow] = useState([
    {
      id: "first",
      data: false,
      readme: false,
    },
    {
      id: "second",
      data: false,
      readme: false,
    },
    {
      id: "third",
      data: true,
      readme: true,
    },
    {
      id: "fourth",
      data: false,
      readme: false,
    },
    {
      id: "fiveth",
      data: false,
      readme: false,
    },
  ]);

  const onHandlePage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const id = e.currentTarget.id;
    setPageShow(
      pageShow.map((page) =>
        page.id === id ? { ...page, data: !page.data } : page
      )
    );
  };

  return (
    <WindowModal bgColor="white">
      <MainContainer>
        <div className="title">
          <h1>자기소개</h1>
          <GoogleDrive
            href="https://drive.google.com/file/d/1SdqJTdIleqVrDkJDOfRKnQP1wn7yGcr1/view?usp=sharing"
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

        <div className="description">
          <p>
            {write.introduction.substring(0, 10)}
            <br />
            {write.introduction.substring(10, 46)}
            <br />
            {write.introduction.substring(46, 100)}
          </p>
        </div>

        <Introduction
          initial={{ y: 0 }}
          animate={{
            y: [50, 0],
            opacity: [0, 0.5, 1],
            transition: { duration: 0.5, delay: 0.8 },
          }}
        >
          <AnimatePresence>
            {pageShow.map((page, index) => {
              return (
                <Fragment key={index}>
                  <MainText id={page.id} onClick={onHandlePage}>
                    <span>📌</span>
                    <h1
                      style={
                        !page.data
                          ? { color: "rgb(180, 180, 180)" }
                          : { color: "black" }
                      }
                    >
                      {write.about[index].main_txt}
                    </h1>
                  </MainText>
                  {page.data ? (
                    <Description
                      animate={{
                        opacity: [0, 1],
                        y: [-50, 0],
                        transition: { duration: 0.5 },
                      }}
                    >
                      <h2 style={{ marginTop: 15 }}>
                        {write.about[index].sub_title1}
                      </h2>
                      <p>&nbsp; {write.about[index].sub_txt1}</p>
                      {write.about[index].sub_txt2 ? (
                        <p>&nbsp; {write.about[index].sub_txt2}</p>
                      ) : null}
                      {write.about[index].sub_txt3 ? (
                        <p>&nbsp; {write.about[index].sub_txt3}</p>
                      ) : null}
                      {page.readme ? (
                        <ReadMe
                          target="blank_"
                          href="https://github.com/chuhongkyu/mapoCharacter#readme"
                        >
                          README.md
                        </ReadMe>
                      ) : null}
                    </Description>
                  ) : null}
                </Fragment>
              );
            })}
          </AnimatePresence>
        </Introduction>
      </MainContainer>
    </WindowModal>
  );
};

export default About;
