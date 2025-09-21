import clsx from "clsx";
import type { HtmlHTMLAttributes } from "react";

type CountdownNumberProps = {
  value: number;
}
  & HtmlHTMLAttributes<HTMLDivElement>;

function CountdownNumber({ className, value }: CountdownNumberProps) {
  return (
    <div
      className={clsx(
        "h-8 w-8",
        "border-2 border-black rounded-full",
        "dark:border-white dark:text-white",
        "text-xs text-center font-bold",
        "transition-all",
        "flex justify-center items-center",
        className,
      )}
    >
      {value}
    </div>
  );
}

export default CountdownNumber;
