import styled from "styled-components";
import gsap, { Power1, Power2, Expo } from "gsap";
import React, { useEffect, useRef, useState } from "react";

const Carousel = styled.div`
  position: relative;
  opacity: 1;
  background: red;
  width: 100%;
  overflow: hidden;
  .carousel__stage {
    position: relative;
    display: block;
    white-space: nowrap;
    .slide {
      display: inline-block;
      width: 2600px;
      height: 300px;
      margin: 20px;
      background: yellow;
      padding: 0;
    }
  }
`;

gsap.registerPlugin(Draggable, InertiaPlugin);

interface IRule {
  vars?: Draggable.Vars | undefined;
}

const Project_Carousel = () => {
  const [curSlide, updateCurSlide] = useState(1);
  const [slideCount, updateSlideCount] = useState(3);
  const dragInstance = useRef<any>();
  const dragTarget = useRef(null);
  const dragBounds = useRef<any>(null);
  const itemsRef = useRef<any>([]);

  useEffect(() => {}, []);

  const DragRule: IRule = {
    vars: {
      type: "scroll",
      bounds: { width: 1920, height: 1080 },
      throwProps: true,
      dragClickables: true,
    },
  };

  useEffect(() => {
    dragInstance.current = Draggable.create(dragTarget.current, DragRule);
    // Cleanup
    return () => dragInstance.current[0].kill();
  }, []);

  const onThrow = () => {
    updateCurrentSlide(itemsRef.current[curSlide]);
  };

  const updateCurrentSlide = (slide: any) => {
    let slideX = slide.getBoundingClientRect().left;
    let slideWidth = slide.getBoundingClientRect().width;

    if (slideX < 0) {
      updateCurSlide(curSlide + 1);
    }
    console.log(curSlide);
  };

  useEffect(() => {
    dragInstance.current[0].addEventListener("throwupdate", () => {
      onThrow();
    });
  }, [dragInstance]);

  return (
    <Carousel ref={dragBounds}>
      <div>
        {curSlide} of {slideCount}
      </div>
      <div ref={dragTarget} draggable="true" className="carousel__stage">
        <div
          className="slide"
          ref={(el) => {
            itemsRef.current[0] = el;
          }}
        ></div>
        <div
          className="slide"
          ref={(el) => {
            itemsRef.current[1] = el;
          }}
        ></div>
        <div
          className="slide"
          ref={(el) => {
            itemsRef.current[2] = el;
          }}
        ></div>
      </div>
    </Carousel>
  );
};

export default Project_Carousel;
