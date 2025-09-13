import { clsx } from "clsx";
import type { ButtonHTMLAttributes, RefAttributes } from "react";

type KeypadButtonProps = {
  highlighted?: boolean;
}
  & ButtonHTMLAttributes<HTMLButtonElement>
  & RefAttributes<HTMLButtonElement>;

function KeypadButton({
  highlighted,
  className,
  ref,
  ...props
}: KeypadButtonProps) {

  return (
    <button
      ref={ref}
      {...props}
      tabIndex={-1}
      className={clsx(
        "py-6 px-10 border border-black rounded-md",
        "transition-colors hover:bg-blue-800/20 active:bg-blue-800/45",
        { "bg-blue-800/45": highlighted },
        "text-center uppercase text-xl font-bold",
        className,
      )}
    >
    </button>
  );
}

export default KeypadButton;
