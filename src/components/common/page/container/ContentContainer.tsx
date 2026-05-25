import React from "react";

import { IContentContainerProps } from "@/components/common/page/container/ContainerType";

const ContentContainer = React.forwardRef<
  HTMLDivElement,
  IContentContainerProps
>((props, ref) => {
  const { id, children } = props;

  return (
    <div className="content-container t5-meduim" id={id} ref={ref}>
      {children}
    </div>
  );
});

export default ContentContainer;
