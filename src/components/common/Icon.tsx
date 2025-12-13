import { cloneElement, isValidElement, ReactElement } from "react";

interface IconProps {
  svg: ReactElement<any>;
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

const Icon = ({ svg, className, width, height, style }: IconProps) => {
  if (!isValidElement(svg)) {
    return null;
  }

  const svgProps = svg.props as Record<string, any>;

  // className 병합
  const mergedClassName = [svgProps.className, className]
    .filter(Boolean)
    .join(" ");

  // SVG 요소를 복제하여 props를 전달
  return cloneElement(svg, {
    ...svgProps,
    className: mergedClassName || undefined,
    width: width ?? svgProps.width,
    height: height ?? svgProps.height,
    style: { ...svgProps.style, ...style },
  } as any);
};

export default Icon;
