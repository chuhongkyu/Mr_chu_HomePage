import { cloneElement, isValidElement, ReactElement, SVGProps } from "react";

interface IconProps {
  svg: ReactElement<SVGProps<SVGSVGElement>>;
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

const Icon = ({ svg, className, width, height, style }: IconProps) => {
  if (!isValidElement(svg)) {
    return null;
  }

  const svgProps = svg.props as SVGProps<SVGSVGElement>;

  const mergedClassName = [svgProps.className, className]
    .filter(Boolean)
    .join(" ");

  return cloneElement(svg, {
    ...svgProps,
    className: mergedClassName || undefined,
    width: width ?? svgProps.width,
    height: height ?? svgProps.height,
    style: { ...svgProps.style, ...style },
  });
};

export default Icon;
