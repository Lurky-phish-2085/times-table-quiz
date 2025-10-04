import clsx from "clsx";
import QuizResultScoreCountDisplay from "./quiz-result-score-display";

type QuizScoreBreakdownProps = {
  incorrectCount: number,
  correctCount: number,
};

function QuizScoreBreakdown({
  incorrectCount,
  correctCount,
}: QuizScoreBreakdownProps) {
  return (
    <div
      className={clsx(
        "flex justify-center gap-6",
      )}
    >
      <QuizResultScoreCountDisplay
        className="text-primary"
        heading="Incorrect"
        value={incorrectCount}
      />
      <QuizResultScoreCountDisplay
        className="text-text-green dark:text-text-green-light"
        heading="Correct"
        value={correctCount}
      />
    </div>
  );
}

export default QuizScoreBreakdown;
