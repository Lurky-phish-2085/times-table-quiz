import clsx from "clsx";
import type { HtmlHTMLAttributes } from "react";
import Surface from "../atoms/surface";

type QuizResultScoreCountDisplayProps = {
  heading: string,
  value: number,
}
  & HtmlHTMLAttributes<HTMLDivElement>;

function QuizResultScoreCountDisplay({
  className,
  heading,
  value,
}: QuizResultScoreCountDisplayProps) {
  return (
    <div
      className={clsx(
        "w-24",
        "text-center font-bold uppercase text-xs",
        "flex flex-col gap-4",
        className,
      )}
    >
      <div>{heading}</div>
      <Surface
        className="text-2xl rounded-3xl text-black"
      >
        {value}
      </Surface>
    </div>
  );
}

export default QuizResultScoreCountDisplay;
