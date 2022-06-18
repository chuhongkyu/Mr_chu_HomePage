import { useRef, useState } from "react";
import styled from "styled-components";
import throttle from "../utils/throttle";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Container = styled.div`
  width: 100%;
  background-color: gray;
`;

const List = styled.div`
  width: 100%;
  height: 20vh;
  padding: 5px;
  overflow-y: hidden;
  display: flex;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  background-color: rgb(255, 255, 234);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  img {
    width: 250px;
    height: 100%;
  }
`;

const SliderContainer = () => {
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const delay = 100;
  const onThrottleDragMove = throttle(onDragMove, delay);
  return (
    <Container>
      <List
        ref={scrollRef}
        onMouseDown={onDragStart}
        onMouseMove={isDrag ? onThrottleDragMove : null}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
      >
        <Item>
          <img src={env.PUBLIC_URL + "/assets/others_img/01.png"} alt="dd" />
        </Item>
        <Item>
          <img src={env.PUBLIC_URL + "/assets/others_img/02.jpg"} alt="dd" />
        </Item>
        <Item>
          <img src={env.PUBLIC_URL + "/assets/others_img/03.jpg"} alt="dd" />
        </Item>
        <Item>
          <img src={env.PUBLIC_URL + "/assets/others_img/04.jpg"} alt="dd" />
        </Item>
        <Item>
          <img src={env.PUBLIC_URL + "/assets/others_img/05.png"} alt="dd" />
        </Item>
      </List>
    </Container>
  );
};

export default SliderContainer;
