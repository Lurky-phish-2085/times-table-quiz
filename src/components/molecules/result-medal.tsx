import clsx from "clsx";
import type { HtmlHTMLAttributes } from "react";
import type { QuizResultMedal } from "../organisms/times-table-quiz-app/types";

type ResultMedalProps = QuizResultMedal
  & HtmlHTMLAttributes<HTMLDivElement>;

function ResultMedal({
  className,
  medalImage,
  name,
  title,
  subTitleMessage,
}: ResultMedalProps) {
  return (
    <div
      className={clsx(
        "text-center",
        "grid place-items-center gap-6",
        className,
      )}
    >
      <img
        className="w-24"
        src={medalImage}
        alt={name}
      />
      <h1
        className="text-4xl font-black"
      >
        {title}
      </h1>
      <p
        className="text-lg"
      >
        {subTitleMessage}
      </p>
    </div >
  );
}

export default ResultMedal;
