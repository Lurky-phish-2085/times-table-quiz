import clsx from "clsx";
import type { ButtonHTMLAttributes, RefAttributes } from "react";

const BUTTON_COMMON_STYLES: string = clsx(
  "px-8 py-4",
  "border-2 rounded-full",
  "font-extrabold",
  "transition-colors",
  "disabled:opacity-45",
);

const FILLED_PRIMARY_BUTTON_STYLES: string = clsx(
  BUTTON_COMMON_STYLES,
  "border-primary",
  "text-white",
  "bg-primary",
  "hover:bg-primary-dark hover:border-primary-dark",
);

const OUTLINE_PRIMARY_BUTTON_STYLES: string = clsx(
  BUTTON_COMMON_STYLES,
  "border-primary",
  "text-primary",
  "hover:bg-primary hover:text-white",
);

const OUTLINE_NEUTRAL_BUTTON_STYLES: string = clsx(
  BUTTON_COMMON_STYLES,
  "border-neutral-400",
  "text-neutral-400",
  "hover:bg-neutral-400 hover:text-white",
);

type ButtonVariants =
  "filled-primary"
  | "outline-primary"
  | "outline-neutral";

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
  const styles =
    variant === "filled-primary" ? FILLED_PRIMARY_BUTTON_STYLES :
      variant === "outline-primary" ? OUTLINE_PRIMARY_BUTTON_STYLES :
        variant === "outline-neutral" ? OUTLINE_NEUTRAL_BUTTON_STYLES : ""

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
