import { clsx } from "clsx";
import { useState, type ButtonHTMLAttributes, type RefAttributes } from "react";
import { useEventListener } from "usehooks-ts";

type KeypadButtonProps = {
  glowOnKey?: string;
}
  & ButtonHTMLAttributes<HTMLButtonElement>
  & RefAttributes<HTMLButtonElement>;

function KeypadButton({
  className,
  glowOnKey,
  onClick,
  ref,
  ...props
}: KeypadButtonProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const setToInactive = () => setTimeout(() => setIsActive(false), 80);

  const onKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    if (key === glowOnKey) {
      setIsActive(true);
    }
  };
  const onKeyUp = (event: KeyboardEvent) => {
    const { key } = event;

    if (key === glowOnKey) {
      setToInactive();
    }
  };

  if (glowOnKey) {
    useEventListener("keydown", onKeyDown);
    useEventListener("keyup", onKeyUp);
  }

  return (
    <button
      ref={ref}
      {...props}
      tabIndex={-1}
      className={clsx(
        "py-6 px-10 border border-black rounded-md",
        "transition-colors hover:bg-blue-800/20 active:bg-blue-800/45",
        { "bg-blue-800/45": isActive },
        "text-center uppercase text-xl font-bold",
        className,
      )}
      onMouseDown={(e) => { e.preventDefault(); onClick?.call(undefined, e) }}
    >
    </button>
  );
}

export default KeypadButton;
