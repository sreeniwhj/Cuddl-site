import type { FC, HTMLAttributes, ReactNode } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
  children: ReactNode;
  className?: string;
}

export const Container: FC<ContainerProps> = ({
  size = "xl",
  as: Component = "div",
  children,
  className = "",
  ...props
}) => {
  const sizeClass = "cw-container--" + size;

  return (
    <Component className={("cw-container " + sizeClass + " " + className).trim()} {...props}>
      {children}
    </Component>
  );
};

export default Container;
