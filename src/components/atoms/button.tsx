import clsx from "clsx";
import type { ButtonHTMLAttributes, RefAttributes } from "react";

const NEUTRAL_COLOR_STYLES: string = clsx(
  "border-neutral",
  "text-neutral",
  "hover:bg-neutral hover:text-white",
);

const BUTTON_BOX_STYLE: string = clsx(
  "px-8 py-4",
);

const ICON_BUTTON_BOX_STYLE: string = clsx(
  "py-4 px-4",
);

const BUTTON_COMMON_STYLES: string = clsx(
  "border-2 rounded-full",
  "font-extrabold",
  "transition-colors",
  "disabled:opacity-45",
);

const FILLED_PRIMARY_BUTTON_STYLES: string = clsx(
  BUTTON_BOX_STYLE,
  BUTTON_COMMON_STYLES,
  "border-primary",
  "text-white",
  "bg-primary",
  "hover:bg-primary-dark hover:border-primary-dark",
);

const OUTLINE_PRIMARY_BUTTON_STYLES: string = clsx(
  BUTTON_BOX_STYLE,
  BUTTON_COMMON_STYLES,
  "border-primary",
  "text-primary",
  "hover:bg-primary hover:text-white",
);

const OUTLINE_NEUTRAL_BUTTON_STYLES: string = clsx(
  BUTTON_BOX_STYLE,
  BUTTON_COMMON_STYLES,
  NEUTRAL_COLOR_STYLES,
);

const ICON_OUTLINE_NEUTRAL_BUTTON_STYLES: string = clsx(
  ICON_BUTTON_BOX_STYLE,
  BUTTON_COMMON_STYLES,
  NEUTRAL_COLOR_STYLES,
);

const ICON_GHOST_BUTTON_STYLES: string = clsx(
  ICON_BUTTON_BOX_STYLE,
  "rounded-full",
  "transition-colors",
  "bg-transparent",
  "hover:bg-neutral-light dark:hover:bg-neutral-dark",
  "disabled:opacity-45",
);

type ButtonVariants =
  "filled-primary"
  | "outline-primary"
  | "outline-neutral"
  | "icon-outline-neutral"
  | "icon-ghost";


type ButtonProps = {
  variant: ButtonVariants;
}
  & ButtonHTMLAttributes<HTMLButtonElement>
  & RefAttributes<HTMLButtonElement>;

function Button({
  variant,
  className,
  ref,
  ...props
}: ButtonProps) {
  let styles = "";

  switch (variant) {
    case "filled-primary":
      styles = FILLED_PRIMARY_BUTTON_STYLES;
      break;
    case "outline-primary":
      styles = OUTLINE_PRIMARY_BUTTON_STYLES;
      break;
    case "outline-neutral":
      styles = OUTLINE_NEUTRAL_BUTTON_STYLES;
      break;
    case "icon-outline-neutral":
      styles = ICON_OUTLINE_NEUTRAL_BUTTON_STYLES;
      break;
    case "icon-ghost":
      styles = ICON_GHOST_BUTTON_STYLES;
      break;
  }

  return (
    <button
      className={clsx(
        styles,
        className,
      )}
      ref={ref}
      {...props}
    >
    </button >
  );
}

export default Button;
