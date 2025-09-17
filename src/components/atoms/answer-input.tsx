import { clsx } from "clsx";
import type { InputHTMLAttributes, RefAttributes } from "react";

type AnswerInputProps =
  & RefAttributes<HTMLInputElement>
  & InputHTMLAttributes<HTMLInputElement>;

function AnswerInput({
  className,
  ref,
  ...props
}: AnswerInputProps) {
  return (
    <input
      className={clsx(
        "overflow-x-auto overflow-y-hidden",
        "h-8 w-32 py-8 border rounded-lg",
        "outline-none",
        "focus:ring-1 focus:ring-gray-500",
        "text-center text-4xl font-bold",
        "flex justify-center items-center",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

export default AnswerInput;
