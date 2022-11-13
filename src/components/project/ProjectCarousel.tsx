import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { IWorksArray, worksData } from "utils/worksData";
import { AiTwotoneCrown } from "react-icons/ai";
import "swiper/css";
import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import { useEffect } from "react";

const Carousel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
  height: 100%;
`;

const Slider = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardGroup = styled(motion.div)`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  perspective: 1800px;
  cursor: grab;
`

const SmallCard = styled(motion.div)`
  position: absolute;
  width: 250px;
  height: 350px;
  background-color: white;
  padding: 10px; 
  border-radius: 5%;
  box-shadow: rgba(133, 101, 101, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  cursor: grab;
  h5{
    font-size: 15px;
    margin-bottom: 3px;
  }
  img{
      width: 100%;
      height: auto;
      pointer-events: none;
  }
`

const Description = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  .description {
    margin-top: 5px;
    font-size: 9px;
  }
  @media ${(props) => props.theme.device.mobile} {
    .description {
      margin-top: 3px;
      font-size: 9px;
    }
  }
`;

const Table = styled.table`
  margin-top: 5px;
  width: 100%;
  .point {
    font-weight: 700;
    padding-right: 3px;
    white-space: nowrap;
    vertical-align: top;
  }
  a {
    font-size: 10px;
  }
  th {
    text-align: start;
    font-size: 10px;
    font-weight: 600;
  }
  td,
  p{
    font-size: 10px;
  }
  @media ${(props) => props.theme.device.mobile} {
    .point {
      padding-right: 2px;
    }
    a {
      font-size: 10px;
    }
    th,
    td,
    p {
      font-size: 10px;
    }
  }
`;

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Project_Carousel = () => {
  const [datas, setDatas] = useState<IWorksArray>(worksData);
  const [state, setState] = useState<string>();

  const x = useMotionValue(0)
  const rotate = useTransform(x,
    [400, -400],
    [80, -70],
  )

  const rotateTag = [
    {rotateY: 0, z: 100, x: 400},
    {rotateY: -36, z: 200, x: 240},
    {rotateY: -72, z: 300, x: 80},
    {rotateY: -108, z: 300, x: -80},
    {rotateY: -144, z: 200, x: -240},
    {rotateY: -180, z: 100, x: -400},
    {rotateY: -216, z: 0, x: -240},
    {rotateY: -252, z: -100, x: -80},
    {rotateY: -288, z: -100, x: 80},
    {rotateY: -324, z: 0, x: 240},
  ];

  const Anim = {
    z: 600, x: 0, rotateY: 0
  }

  useEffect(() => {
    setDatas(worksData);
  }, []);

  return (
    <Carousel>
      <Slider>
        <CardGroup
        style={{z:-100, x: x, rotateY: rotate}}
        drag="x"
        animate={{scale: [0.1, 1], rotateY:[0, 360], transition: {duration : 5}}}
        dragConstraints={{ left: 0, right: 0 }}>
          {datas.map((data, index)=>{
            return(
              <SmallCard 
                key={data.id}
                id={data.id + ""}
                initial={rotateTag[index]}
                onClick={(e) => e.currentTarget.id === state ? setState("") : setState(e.currentTarget.id)}
                animate={state === data.id + "" ? Anim : {}}
                transition={{duration: 1.5, ease: "easeInOut"}}
              >
                <div id={data.id + ""} 
                  style={state === data.id + "" ? {}:
                  {pointerEvents: "none",}}>
                  <h5>{data.name}</h5>
                  <img src={env.PUBLIC_URL + data.img} alt={data.name}/>
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
                  <Description>
                    <p className="description">
                      {data.description.substring(0, 150)+ "..."}
                    </p>
                  </Description>
                </div>            
              </SmallCard>
            )
          })}
        </CardGroup>
      </Slider>
    </Carousel>
  );
};

export default Project_Carousel;
