import clsx from "clsx";
import { FaRotateLeft } from "react-icons/fa6";
import FilledButton from "../../atoms/filled-button";
import OutlineButton from "../../atoms/outline-button";
import ResultMedal from "../../molecules/result-medal";
import { BRONZE_MEDAL, GOLD_MEDAL, MIN_GOLD_SCORE, MIN_SILVER_SCORE, SILVER_MEDAL } from "./constants";
import type { QuizResultItem, TimesTableQuizAppScreenStates } from "./types";

type QuizResultsProps = {
  data: Array<QuizResultItem>;
  onNavigate: (screenState: TimesTableQuizAppScreenStates) => void;
};

function QuizResults({ data: results, onNavigate }: QuizResultsProps) {
  const totalQuizItems = results.length;
  const wrongAnswersCount = results.filter((result) => !result.correct).length;
  const correctAnswersCount = totalQuizItems - wrongAnswersCount;

  let resultMedalData = BRONZE_MEDAL;

  if (correctAnswersCount > MIN_SILVER_SCORE) {
    resultMedalData = SILVER_MEDAL;
  }
  if (correctAnswersCount > MIN_GOLD_SCORE) {
    resultMedalData = GOLD_MEDAL;
  }

  return (
    <div
      className="p-4 h-dvh flex flex-col gap-36"
    >
      <div className="flex flex-col lg:flex-row justify-center">
        <div>
          <ResultMedal
            {...resultMedalData}
          />
        </div>
      </div >
      <div
        className="flex flex-col justify-center items-center gap-12"
      >
        <div>
          <div>Correct: {correctAnswersCount}</div>
          <div>Wrong: {wrongAnswersCount}</div>
        </div>
        <div
          className={clsx(
            "w-96",
            "flex flex-wrap justify-center items-center gap-4",
          )}
        >
          <OutlineButton
            onClick={() => onNavigate("MISTAKES")}
          >
            View Mistakes
          </OutlineButton>
          <FilledButton
            onClick={() => onNavigate("QUIZ")}
          >
            Play Again
          </FilledButton>
          <OutlineButton
            className={clsx(
              "py-2 border-neutral-400",
              "hover:bg-neutral-400 hover: text-white",
              "text-neutral-400",
            )}
            onClick={() => onNavigate("SELECTION")}
          >
            <FaRotateLeft className="inline-block mr-2" />
            <span>Change Selection</span>
          </OutlineButton>
        </div>
      </div>
    </div>
  );
}

export default QuizResults;
