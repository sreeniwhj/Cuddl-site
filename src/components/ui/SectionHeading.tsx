import type { FC, CSSProperties, ReactNode } from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center" | "right";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export const SectionHeading: FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "center",
  as: HeadingTag = "h2",
  className = "",
}) => {
  const alignmentStyle: CSSProperties = {
    textAlign: align,
    alignItems: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
    display: "flex",
    flexDirection: "column",
    gap: "var(--space-3)",
    maxWidth: align === "center" ? "760px" : "100%",
    marginLeft: align === "center" ? "auto" : "0",
    marginRight: align === "center" ? "auto" : "0",
    marginBottom: "var(--space-8)",
  };

  const headingStyle: CSSProperties = {
    fontSize: HeadingTag === "h1" ? "var(--text-display)" : HeadingTag === "h2" ? "var(--text-4xl)" : "var(--text-2xl)",
    fontWeight: "var(--fw-bold)",
    lineHeight: "var(--lh-tight)",
    letterSpacing: "var(--tracking-tight)",
    color: "var(--c-cream-pure)",
  };

  const descStyle: CSSProperties = {
    fontSize: "var(--text-lg)",
    color: "var(--c-text-secondary)",
    lineHeight: "var(--lh-relaxed)",
    fontWeight: "var(--fw-normal)",
    maxWidth: "620px",
  };

  return (
    <div style={alignmentStyle} className={("cw-section-heading " + className).trim()}>
      {eyebrow && <span className="cw-eyebrow">{eyebrow}</span>}
      <HeadingTag style={headingStyle}>{title}</HeadingTag>
      {description && <p style={descStyle}>{description}</p>}
    </div>
  );
};

export default SectionHeading;
