import clsx from "clsx";
import type { HTMLAttributes } from "react";
import type { QuizResultMedal } from "../organisms/times-table-quiz-app/types";

type ResultMedalProps = QuizResultMedal
  & HTMLAttributes<HTMLDivElement>;

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
        className="w-80 text-xl text-center"
      >
        {subTitleMessage}
      </p>
    </div >
  );
}

export default ResultMedal;
