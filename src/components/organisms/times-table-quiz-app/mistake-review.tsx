import Button from "../../atoms/button";
import type { QuizResultItem, TimesTableQuizAppScreenStates } from "./types";

type MistakeReviewProps = {
  data: Array<QuizResultItem>;
  onNavigate: (screenState: TimesTableQuizAppScreenStates) => void;
};

function MistakeReview({ data: results, onNavigate }: MistakeReviewProps) {
  const failedQuizItems = results
    .filter((result) => !result.correct)
    .map((failedQuiz) => failedQuiz.quizItem);

  return (
    <div className="h-full p-4 flex flex-col">
      <h1 className="text-xl">Mistakes</h1>
      {failedQuizItems.length === 0 ? <div>NONE!!!</div> :
        failedQuizItems.map((quiz) => (
          <>
            <div>{quiz.problem.multiplicand} * {quiz.problem.multiplier}  = {quiz.userAnswer}</div>
            <div>WRONG! Correct answer: {quiz.answer}</div>
          </>
        ))}
      <Button
        variant="outline-primary"
        onClick={() => onNavigate("RESULT")}
      >
        Back
      </Button>
    </div>
  );
}

export default MistakeReview;
