import { cloneElement, isValidElement, ReactElement } from "react";

interface IconProps {
  svg: ReactElement;
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

const Icon = ({ svg, className, width, height, style }: IconProps) => {
  if (!isValidElement(svg)) {
    return null;
  }

  // className 병합
  const mergedClassName = [svg.props.className, className]
    .filter(Boolean)
    .join(" ");

  // SVG 요소를 복제하여 props를 전달
  return cloneElement(svg, {
    ...svg.props,
    className: mergedClassName || undefined,
    width: width ?? svg.props.width,
    height: height ?? svg.props.height,
    style: { ...svg.props.style, ...style },
  });
};

export default Icon;

