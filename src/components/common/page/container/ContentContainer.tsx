import React from "react";
import { IContentContainerProps } from "./ContainerType";


const ContentContainer = React.forwardRef<HTMLDivElement, IContentContainerProps>((props, ref) => {
  const { id, children } = props;

  return (
    <div className="content-container" id={id} ref={ref}>
      {children}
    </div>
  );
});

export default ContentContainer;
