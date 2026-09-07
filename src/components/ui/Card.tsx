import type { FC, HTMLAttributes, ReactNode } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
  className?: string;
}

export const Card: FC<CardProps> = ({
  children,
  interactive = false,
  className = "",
  ...props
}) => {
  const interactiveClass = interactive ? "cw-card--interactive" : "";

  return (
    <div className={("cw-card " + interactiveClass + " " + className).trim()} {...props}>
      {children}
    </div>
  );
};

export default Card;
