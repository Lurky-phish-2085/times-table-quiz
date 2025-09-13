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
      <button
        className="border-2 border-red-500 px-8 py-4 rounded-3xl text-red-500 font-bold text-xl hover:bg-red-500 hover:text-white transition-colors"
        onClick={() => onNavigate("MISTAKES")}
      >View Mistakes</button>
      <button
        className="border-2 border-red-500 px-8 py-4 rounded-3xl text-red-500 font-bold text-xl hover:bg-red-500 hover:text-white transition-colors"
        onClick={() => onNavigate("QUIZ")}
      >Retry</button>
      <button
        className="border-2 border-red-500 px-8 py-4 rounded-3xl text-red-500 font-bold text-xl hover:bg-red-500 hover:text-white transition-colors"
        onClick={() => onNavigate("SELECTION")}
      >Change Selection</button>
    </div>
  );
}

export default QuizResults;
