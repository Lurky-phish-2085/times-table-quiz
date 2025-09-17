import FilledButton from "../../atoms/filled-button";
import OutlineButton from "../../atoms/outline-button";
import type { QuizResultItem, TimesTableQuizAppScreenStates } from "./types";

type QuizResultsProps = {
  data: Array<QuizResultItem>;
  onNavigate: (screenState: TimesTableQuizAppScreenStates) => void;
};

function QuizResults({ data: results, onNavigate }: QuizResultsProps) {
  const totalQuizItems = results.length;
  const wrongAnswersCount = results.filter((result) => !result.correct).length;
  const correctAnswersCount = totalQuizItems - wrongAnswersCount;

  return (
    <div className="flex flex-col">
      <h1 className="text-xl">Results:</h1>
      <div>Correct: {correctAnswersCount}</div>
      <div>Wrong: {wrongAnswersCount}</div>
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
        onClick={() => onNavigate("SELECTION")}
      >
        Change Selection
      </OutlineButton>
    </div>
  );
}

export default QuizResults;
