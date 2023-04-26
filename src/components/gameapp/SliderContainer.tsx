import { ReactNode } from "react";
import { useRef, useState } from "react";
import styled from "styled-components";
import throttle from "utils/throttle";

const List = styled.div`
  width: 100%;
  padding: 5px;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface ISlider {
  children: ReactNode;
  height: string;
}

const SliderContainer = ({ height, children }: ISlider) => {
  const scrollRef = useRef<any>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<any>();

  const onDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
  const onThrottleDragMove: any = throttle(onDragMove, delay);
  return (
    <List
      style={{ height: height }}
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={isDrag ? onThrottleDragMove : null}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
    >
      {children}
    </List>
  );
};

export default SliderContainer;
