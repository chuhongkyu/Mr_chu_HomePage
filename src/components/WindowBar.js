import { useState, useEffect } from "react";
import styled from "styled-components";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Bar = styled.div`
  width: 100%;
  height: 5vh;
  background-color: ${(props) => props.theme.black.cloud};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 10px;
  img {
    width: 30px;
    height: 4vh;
  }
`;

function WindowBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Bar>
      <img src={env.PUBLIC_URL + "/assets/img/mrchu.jpeg"} />
      <span>{time.toLocaleTimeString()}</span>
    </Bar>
  );
}

export default WindowBar;
