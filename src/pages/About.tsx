import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import WindowModal from "components/WindowModal";
import { write } from "utils/write";
import { Fragment, useState } from "react";
import Header from "components/about/Header";
import Description from "components/about/Description";
import Content from "components/about/Content";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const MainContainer = styled.div`
  font-family: "Maple_story";
  width: 1200px;
  height: 100%;
  padding: 30px 50px 0;
  overflow-y: scroll;
  scroll-behavior: smooth;
  border-radius: 10px;
  position: relative;
  
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

const Description1 = styled(motion.div)`
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
        <Header/>
        <Description/>

        <Introduction
          initial={{ y: 0 }}
          animate={{
            y: [50, 0],
            opacity: [0, 0.5, 1],
            transition: { duration: 0.5, delay: 0.8 },
          }}
        >
          <Content/>
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
                    <Description1
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
                    </Description1>
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
