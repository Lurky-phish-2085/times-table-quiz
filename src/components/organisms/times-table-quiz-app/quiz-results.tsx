import clsx from "clsx";
import { FaRotateLeft } from "react-icons/fa6";
import Button from "../../atoms/button";
import QuizScoreBreakdown from "../../molecules/quiz-score-breakdown";
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
      className="max-sm:overflow-x-hidden p-4 h-full flex flex-col justify-center items-center md:flex-row md:justify-around md:gap-0 gap-16"
    >
      <ResultMedal
        {...resultMedalData}
      />
      <div
        className="flex flex-col justify-center items-center gap-12"
      >
        <QuizScoreBreakdown
          incorrectCount={wrongAnswersCount}
          correctCount={correctAnswersCount}
        />
        <div
          className={clsx(
            "w-96",
            "flex flex-wrap justify-center items-center gap-4",
          )}
        >
          <Button
            variant="outline-primary"
            onClick={() => onNavigate("MISTAKES")}
          >
            View Mistakes
          </Button>
          <Button
            variant="filled-primary"
            onClick={() => onNavigate("QUIZ")}
          >
            Play Again
          </Button>
          <Button
            className="py-2 px-3 text-xs uppercase"
            variant="outline-neutral"
            onClick={() => onNavigate("SELECTION")}
          >
            <FaRotateLeft className="inline-block mr-2" />
            <span>Change Selection</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuizResults;
