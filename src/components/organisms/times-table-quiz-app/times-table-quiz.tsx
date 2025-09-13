import { clsx } from "clsx";
import { useState } from "react";
import Timer from "../../atoms/timer";
import InputPanel from "../input-panel";
import type { QuizConfiguration, QuizItem, QuizResultItem } from "./types";

export type TimesTableQuizProps = {
  config: QuizConfiguration;
  onQuizFinish: (results: Array<QuizResultItem>) => void;
};

function TimesTableQuiz({
  config,
  onQuizFinish,
}: TimesTableQuizProps) {
  const [quizResults, setQuizResults] = useState<Array<QuizResultItem>>([]);

  const { selectedTimesColumn, quizTimerSeconds } = config;

  const [currentQuizItem, setCurrentQuizItem] = useState<QuizItem | null>(null);
  const [userInput, setUserInput] = useState<string>("");

  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(true);

  const createNewQuiz = () => {
    let quiz = generateQuiz(selectedTimesColumn);

    const isQuizGeneratedRecently = (): boolean => {
      const isResultsEmpty = quizResults.length === 0;

      if (isResultsEmpty) return false;

      const recentPreviousResult = quizResults
        .map((result) => result.quizItem)
        .at(-1);

      return quiz.problem === recentPreviousResult?.problem;
    };

    while (isQuizGeneratedRecently()) {
      quiz = generateQuiz(selectedTimesColumn);
    }

    setCurrentQuizItem(quiz);
  };

  const evaluateQuizResult = () => {
    if (!currentQuizItem) return;

    const { userAnswer, answer } = currentQuizItem;

    const result: QuizResultItem = {
      quizItem: currentQuizItem,
      correct: userAnswer === answer,
    };

    setQuizResults((prev) => [...prev, result]);
  };

  const handleStartTimerTimeout = () => {
    createNewQuiz();
    setIsTimerPaused(false);
  };

  const handleAnswerSubmit = (answer: string) => {
    if (!currentQuizItem) return;

    currentQuizItem.userAnswer = answer;

    evaluateQuizResult();

    createNewQuiz();
  };

  const problem = currentQuizItem?.problem ?? "";

  return (
    <div
      className={clsx(
        "p-4 h-dvh",
        "flex flex-col",
      )}
    >
      <div className="flex-grow">
        <Timer
          countDownSeconds={quizTimerSeconds}
          paused={isTimerPaused}
          onFinish={() => {
            const message = `Time's up! SCORE: ${quizResults.filter(q => q.correct).length}/${quizResults.length}\n\n`;
            alert(message + quizResults.map(q => `${JSON.stringify(q.quizItem)}\t${q.correct ? "CORRECT" : "WRONG"}`).join("\n"));

            onQuizFinish(quizResults);
          }}
        />
        <div>{problem}</div>
        <div>{userInput}</div>
      </div>
      <Timer
        countDownSeconds={3}
        timeoutMessage="START"
        onFinish={handleStartTimerTimeout}
      />
      <InputPanel
        onInputChange={(input) => setUserInput(input)}
        onSubmitInput={(answer) => handleAnswerSubmit(answer)}
        disabled={!currentQuizItem}
        hideInputDisplay
      />
    </div>
  );
}

function generateQuiz(timesColumns: Array<number>): QuizItem {
  const MIN_MULTIPLIER = 1;
  const MAX_MULTIPLIER = 12;

  const getRandomMultiplicand = (): number =>
    timesColumns[getRandomInt(0, timesColumns.length - 1)];

  const multiplicand = getRandomMultiplicand();
  const multiplier = getRandomInt(MIN_MULTIPLIER, MAX_MULTIPLIER);

  const operands: Array<number> = [
    multiplicand,
    multiplier,
  ];

  const shouldSwapOperands = (): boolean => getRandomInt(0, 1) > 0;

  const swapOperands = () => {
    const formerLeftOperand = operands[0];

    operands[0] = operands[1];
    operands[1] = formerLeftOperand;
  };

  if (shouldSwapOperands()) {
    swapOperands();
  }

  const problem: string = `${operands[0]} X ${operands[1]}`;
  const answer: string = String(operands[0] * operands[1]);

  return {
    problem,
    answer,
    userAnswer: "",
  };
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default TimesTableQuiz;
