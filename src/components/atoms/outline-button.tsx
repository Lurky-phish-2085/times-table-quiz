import clsx from "clsx";
import type { ButtonHTMLAttributes, RefAttributes } from "react";

type OutlineButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
  & RefAttributes<HTMLButtonElement>;

function OutlineButton({
  className,
  disabled,
  ref,
  ...props
}: OutlineButtonProps) {
  return (
    <button
      className={clsx(
        "border-2 border-primary px-8 py-4 rounded-full",
        "text-primary font-extrabold",
        "transition-colors",
        "hover:bg-primary hover:text-white",
        { "opacity-45": disabled },
        className,
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
    </button>
  );
}

export default OutlineButton;
