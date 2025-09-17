import clsx from "clsx";
import type { ButtonHTMLAttributes, RefAttributes } from "react";

type FilledButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
  & RefAttributes<HTMLButtonElement>;

function FilledButton({
  className,
  disabled,
  ref,
  ...props
}: FilledButtonProps) {
  return (
    <button
      className={clsx(
        "border-2 border-primary px-8 py-4 rounded-full",
        "text-white font-extrabold",
        "transition-colors",
        "bg-primary",
        "hover:bg-primary-dark hover:border-primary-dark",
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

export default FilledButton;
