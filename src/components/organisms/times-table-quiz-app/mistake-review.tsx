
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
    <div className="flex flex-col">
      <h1 className="text-xl">Mistakes</h1>
      {failedQuizItems.length === 0 ? <div>NONE!!!</div> :
        failedQuizItems.map((quiz) => (
          <>
            <div>{quiz.problem} = {quiz.userAnswer}</div>
            <div>WRONG! Correct answer: {quiz.answer}</div>
          </>
        ))}
      <button
        className="border-2 border-red-500 px-8 py-4 rounded-3xl text-red-500 font-bold text-xl hover:bg-red-500 hover:text-white transition-colors"
        onClick={() => onNavigate("RESULT")}
      >Back</button>
    </div>
  );
}

export default MistakeReview;
