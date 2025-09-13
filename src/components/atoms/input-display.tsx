import { clsx } from "clsx";
import type { HtmlHTMLAttributes } from "react";

type InputDisplayProps = {
  content?: string;
  highlighted?: boolean;
  hidden?: boolean;
}
  & HtmlHTMLAttributes<HTMLDivElement>;

function InputDisplay({
  className,
  content,
  highlighted,
  hidden,
  ...props
}: InputDisplayProps) {
  return (
    <div
      className={clsx(
        { "hidden": hidden },
        "overflow-x-auto overflow-y-hidden",
        "h-8 py-8 border border-black rounded-lg",
        "text-center text-4xl font-bold",
        { "bg-gray-200": highlighted },
        "flex justify-center items-center",
        className,
      )}
      {...props}
    >
      {content}
    </div>
  );
}

export default InputDisplay;
