import { clsx } from "clsx";
import { useState, type ButtonHTMLAttributes, type MouseEvent, type RefAttributes } from "react";
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

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick?.call(undefined, e);

    setIsActive(true);
    setToInactive();
  };

  return (
    <button
      tabIndex={-1}
      className={clsx(
        "border-2 rounded-2xl",
        "bg-neutral-100",
        "py-3.5 px-10 border rounded-md",
        "transition-colors",
        "hover:bg-primary-light",
        "active:bg-primary/80 active:border-primary/80 active:text-white",
        { "bg-primary/80 border-primary/80 text-white hover:bg-primary/80": isActive },
        "text-center uppercase text-xl font-bold",
        className,
      )}
      ref={ref}
      onClick={handleOnClick}
      {...props}
    >
    </button>
  );
}

export default KeypadButton;
