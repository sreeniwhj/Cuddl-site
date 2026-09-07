import type { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
}

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "",
  as: Component = "button",
  href,
  disabled,
  ...props
}) => {
  const variantClass = "cw-btn--" + variant;
  const sizeClass = "cw-btn--" + size;
  const widthClass = fullWidth ? "cw-btn--full" : "";
  const combinedClasses = ("cw-btn " + variantClass + " " + sizeClass + " " + widthClass + " " + className).trim();

  if (Component === "a" && href) {
    return (
      <a href={href} className={combinedClasses} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" disabled={disabled} className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
