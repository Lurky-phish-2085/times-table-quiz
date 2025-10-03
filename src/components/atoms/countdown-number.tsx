import clsx from "clsx";
import type { HTMLAttributes } from "react";

type CountdownNumberProps = {
  value: number;
}
  & HTMLAttributes<HTMLDivElement>;

function CountdownNumber({ className, value }: CountdownNumberProps) {
  return (
    <div
      className={clsx(
        "h-8 w-8 lg:h-8 lg:w-8 md:h-16 md:w-16",
        "lg:border-2 md:border-4 border-2 border-black rounded-full",
        "dark:border-white dark:text-white",
        "lg:text-xs md:text-xl text-xs text-center font-bold",
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
