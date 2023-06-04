import styled from "styled-components";
import { useState } from "react";
import { IWorksArray, worksData } from "utils/worksData";
import { AiTwotoneCrown } from "react-icons/ai";
import "swiper/css";
import { motion, useMotionValue, useTransform} from "framer-motion";
import { useEffect } from "react";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

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

const LeftArrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotateY(180deg);
  z-index: 20;
  left: 10px;
  width: 70px;
  height: 70px;
  background: url("${env.PUBLIC_URL}/assets/icons/arrow.svg") center center/ cover no-repeat;
  cursor: pointer;
`

const RightArrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  right: 10px;
  width: 70px;
  height: 70px;
  background: url("${env.PUBLIC_URL}/assets/icons/arrow.svg") center center/ cover no-repeat;
  cursor: pointer;
`

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
  width: 300px;
  height: 400px;
  cursor: grab;
  transform-style: preserve-3d;
  perspective: 1800px;
  .front{
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 400px;
    background-color: white;
    padding: 10px; 
    border-radius: 5%;
    box-shadow: rgba(133, 101, 101, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    z-index: 4;
    backface-visibility: hidden;
    overflow: hidden;
  }
  .back{
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 400px;
    background-color: white;
    padding: 10px; 
    border-radius: 5%;
    border: 1px solid black;
    z-index: -1;
    backface-visibility: hidden;
    transform: rotateY(180deg);
    .card{
      width: 100%;
      height: 100%;
      padding: 10px;
      border-radius: 5%;
      background: repeating-linear-gradient(-45deg, #273d7a, #273d7a 10px, 
    #1897af 0, 
    #1897af 20px);
    }
  }
  h5{
    font-size: 17px;
    margin-bottom: 3px;
  }
  .card-top{
    width: 100%;
    height: 170px;
    display: flex;
    gap: 10px;
    .__img{
      max-width: 200px;
      height: 170px;
      pointer-events: none;
      &.column{
        width: auto;
        height: 150px;
      }
    }
  }
  

  @media ${(props) => props.theme.device.mac} {
    width: 250px;
    height: 350px;
    .front{
      width: 100%;
      height: 350px;
    }
    .back{
      width: 100%;
      height: 350px;
    }
    h5{
    font-size: 15px;
    margin-bottom: 3px;
    }
    .card-top{
      width: 100%;
      height: 140px;
      .__img{
        max-width: 200px;
        height: 140px;
        pointer-events: none;
        &.column{
          width: auto;
          height: 140px;
        }
      }
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    h5{
    font-size: 12px;
    margin-bottom: 3px;
    }
    .card-top{
      width: 100%;
      height: 100px;
      .__img{
        max-width: 200px;
        height: 100px;
        pointer-events: none;
        &.column{
          width: auto;
          height: 10px;
        }
      }
    }
  }
`

const Description = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding-top: 10px;
  border-top: 0.5px solid rgba(0,0,0,0.14);
  .description {
    font-size: 11px;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }
  @media ${(props) => props.theme.device.mac} {
    padding-top: 10px;
    .description {
      font-size: 10px;
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    padding-top: 5px;
    .description {
      font-size: 9px;
    }
  }
`;

const Table = styled.table`
  margin: 5px 0 10px;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .url_decoration{
    text-decoration: underline;
    font-weight: 800;
    cursor: pointer;
  }
  .point {
      font-weight: 700;
      padding-right: 3px;
      white-space: nowrap;
      vertical-align: top;
  }
  a {
      font-size: 10px;
  }
  tbody{
    height: fit-content;
  }
  th {
      text-align: start;
      font-size: 10px;
      font-weight: 600;
  }
  tr{
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

const Project_Carousel = () => {
  const [datas, setDatas] = useState<IWorksArray>(worksData);
  const [state, setState] = useState<string>("0");

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
    // {rotateY: -324, z: 0, x: 240},
  ];

  const Anim = [
    {z: 600, x: [400, 450, 0], rotateY: 0, width: "450px"},
    {z: 600, x: [240, 340, 0], rotateY: 0, width: "450px"},
    {z: 600, x: [80, 180, 0], rotateY: 0, width: "450px"},
    {z: 600, x: [-80, -180, 0], rotateY: 0, width: "450px"},
    {z: 600, x: [-240, -340, 0], rotateY: 0, width: "450px"},
    {z: 600, x: [-400, -500, 0], rotateY: 0, width: "450px"},
    {z: 600, x: [-240, -340, 0], rotateY: 0, width: "450px"},
    {z: 600, x: [-80, -180, 0], rotateY: 0, width: "450px"},
    {z: 600, x: [80, 180, 0], rotateY: 0, width: "450px"},
    // {z: 600, x: [240, 340, 0], rotateY: 0, width: "450px"},
  ]

  useEffect(() => {
    setDatas(worksData);
  }, []);

  const LeftBtn = ()=>{
    if(state == "0" || undefined || null || ""){
      setState("8")
    }else{
      setState(prev => (Number(prev) - 1)+ "")
    }
  }

  const RightBtn = ()=>{
    if(state == "8" || undefined || null || ""){
      setState("0")
    }else{
      setState(prev => (Number(prev) + 1)+ "")
    }
  }

  return (
    <Carousel>
      <LeftArrow onClick={LeftBtn}></LeftArrow>
      <RightArrow onClick={RightBtn}></RightArrow>
      <Slider>
        <CardGroup
        style={{z:-100, x: x, rotateY: rotate}}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}>
          {datas.map((data, index)=>{
            return(
              <SmallCard 
                key={data.id}
                id={data.id + ""}
                initial={rotateTag[index]}
                onClick={(e) => e.currentTarget.id === state ? setState("") : setState(e.currentTarget.id)}
                animate={state == data.id + "" ? Anim[index] : {}}
                transition={{duration: 1.5, ease: "easeInOut"}}
              >
                <div className="front">
                  <h5>{data.name}</h5>
                  <div className="card-top">
                    <img className={data.id == 2 ? "__img column": "__img"} 
                          src={env.PUBLIC_URL + data.img} alt={data.name}
                      />
                    {state == data.id + "" ?
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
                                <AiTwotoneCrown style={{ marginRight: 5, }} />
                                배포
                              </td>
                              <td>
                                <a
                                  className="url_decoration"
                                  href={data.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  ####Link####
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
                                    : data.github.substring(0, 35) + "..."}
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
                    </Table>: null}
                  </div>
                       
                  <Description>
                    <p className="description">
                      {data.description}
                    </p>
                  </Description>
                </div>
                <div className="back"><div className="card"></div></div>
              </SmallCard>
            )
          })}
        </CardGroup>
      </Slider>
    </Carousel>
  );
};

export default Project_Carousel;