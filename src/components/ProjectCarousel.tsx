import styled from "styled-components";
import { useState } from "react";
import { IWorksArray, worksData } from "utils/worksData";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiTwotoneCrown } from "react-icons/ai";
import "swiper/css";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Carousel = styled.div`
  width: 100%;
  height: 100%;
`;

const BigSlide = styled(motion.div)`
  overflow: hidden;
  min-height: 400px;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 15px;
  transform-origin: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  .Carousel_Header {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    width: 100%;
    position: relative;
    overflow: hidden;
    a {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
      padding: 20px 15px 0;
      img {
        width: 460px;
        height: 320px;
        border: 1px solid black;
      }
      .Header_text {
        h5 {
          font-size: 40px;
          font-weight: 700;
        }
        b {
          font-size: 15px;
          color: rgba(108, 117, 125, 0.8);
        }
      }
    }
  }
  @media ${(props) => props.theme.device.mac} {
    .Carousel_Header {
      a {
        gap: 10px;
        padding: 20px 15px 0;
        img {
          width: 350px;
          height: 200px;
        }
        .Header_text {
          h5 {
            font-size: 38px;
            font-weight: 700;
          }
          b {
            font-size: 15px;
          }
        }
      }
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    .Carousel_Header {
      a {
        img {
          width: 200px;
          height: 120px;
          border: 1px solid black;
        }
        .Header_text {
          h5 {
            font-size: 19px;
          }
          b {
            font-size: 11px;
          }
        }
      }
    }
  }
`;

const Description = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px 20px;
  .description {
    margin-top: 10px;
    font-size: 15px;
  }
  @media ${(props) => props.theme.device.mobile} {
    .description {
      margin-top: 8px;
      font-size: 12px;
    }
  }
`;

const Table = styled.table`
  margin-top: 5px;
  width: 100%;
  .point {
    font-weight: 700;
    padding-right: 10px;
    white-space: nowrap;
    vertical-align: top;
  }
  a {
    font-size: 15px;
  }
  th {
    text-align: start;
    font-size: 20px;
    font-weight: 600;
  }
  @media ${(props) => props.theme.device.mobile} {
    .point {
      padding-right: 15px;
    }
    a {
      font-size: 11px;
    }
    th,
    td,
    p {
      font-size: 11px;
    }
  }
`;

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Project_Carousel = () => {
  const [datas, setDatas] = useState<IWorksArray>(worksData);
  const [state, setState] = useState<number>(0);

  useEffect(() => {
    setDatas(worksData);
  }, []);

  return (
    <Carousel>
      <Swiper
        slidesPerView={2}
        spaceBetween={1}
        centeredSlides={true}
        roundLengths={true}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
        }}
        onSlideChange={(swiper) => {
          setState(swiper.realIndex);
          console.log("slide change", state);
        }}
        style={{
          height: "100%",
          paddingTop: 10,
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // flexDirection: "column",
        }}
      >
        {datas.map((data, index) => {
          return (
            <SwiperSlide key={index} id={data.id + ""}>
              <BigSlide
                initial={
                  state === index
                    ? { scale: 1 }
                    : {
                        scale: 0.8,
                        background: `url(${
                          env.PUBLIC_URL + data.img
                        }) center no-repeat`,
                        backgroundSize: "cover",
                      }
                }
                animate={
                  state === index
                    ? {
                        scale: 1,
                        background: "white",
                      }
                    : {
                        scale: 0.8,
                        background: `url(${
                          env.PUBLIC_URL + data.img
                        }) center no-repeat`,
                        backgroundSize: "cover",
                      }
                }
                transition={{ duration: 1, type: "spring" }}
              >
                {state === index ? (
                  <>
                    <div className="Carousel_Header">
                      <a
                        href={data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="Header_text">
                          <h5>{data.name}</h5>
                          <b>{data.date}</b>
                        </div>
                        <img src={env.PUBLIC_URL + data.img} alt={data.name} />
                      </a>
                    </div>
                    <Description>
                      <Table>
                        <tbody>
                          <tr>
                            <td className="point">
                              <AiTwotoneCrown style={{ marginRight: 5 }} />
                              주요 기능
                            </td>
                            <td>
                              <span style={{ display: "flex" }}>
                                {data.point.map((m, index) => (
                                  <p key={index}>{m}</p>
                                ))}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="point">
                              <AiTwotoneCrown style={{ marginRight: 5 }} />
                              배포
                            </td>
                            <td>
                              <a
                                className="url_decoration"
                                href={data.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Link
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="point">
                              <AiTwotoneCrown style={{ marginRight: 5 }} />깃
                              허브
                            </td>
                            <td>
                              <a
                                href={data.github}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {data.github.length < 40
                                  ? data.github
                                  : data.github.substring(0, 40) + "..."}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="point">
                              <AiTwotoneCrown style={{ marginRight: 5 }} />
                              기술
                            </td>
                            <td>
                              <span style={{ display: "flex" }}>
                                {data.skills.map((m, index) => (
                                  <p key={index}>{m}, </p>
                                ))}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="point">
                              <AiTwotoneCrown style={{ marginRight: 5 }} />
                              개발
                            </td>
                            <td>
                              <p>{data.people}</p>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <div className="description">{data.description}</div>
                    </Description>
                  </>
                ) : null}
              </BigSlide>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Carousel>
  );
};

export default Project_Carousel;