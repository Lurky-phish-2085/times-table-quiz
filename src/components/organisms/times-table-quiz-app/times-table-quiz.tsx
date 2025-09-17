import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import AnswerInput from "../../atoms/answer-input";
import Timer from "../../atoms/timer";
import Keypad from "../../molecules/keypad";
import { useAnswerInput } from "./hooks";
import type { QuizConfiguration, QuizItem, QuizResultItem } from "./types";

export type TimesTableQuizProps = {
  config: QuizConfiguration;
  onQuizFinish: (results: Array<QuizResultItem>) => void;
};

function TimesTableQuiz({
  config,
  onQuizFinish,
}: TimesTableQuizProps) {
  const { selectedTimesColumn, quizTimerSeconds } = config;

  const [isQuizPaused, setIsQuizPaused] = useState<boolean>(true);

  const [currentQuizItem, setCurrentQuizItem] = useState<QuizItem | null>(null);
  const [quizResults, setQuizResults] = useState<Array<QuizResultItem>>([]);

  const {
    inputValue: userAnswerInput,
    setInputValue: setUserAnswerInput,
    append: appendUserAnswerInput,
    backspace: backspaceUserAnswerInput,
    clear: clearUserAnswerInput,
  } = useAnswerInput();

  const answerInputRef = useRef<HTMLInputElement>(null);
  const focusOnAnswerInput = () => answerInputRef.current?.focus();

  useEffect(() => {
    if (!isQuizPaused) {
      focusOnAnswerInput();
    }
  }, [isQuizPaused]);

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
    setIsQuizPaused(false);
  };

  const handleAnswerSubmit = (answer: string) => {
    if (!currentQuizItem) return;

    clearUserAnswerInput();

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
          paused={isQuizPaused}
          onFinish={() => onQuizFinish(quizResults)}
        />
        <div>{problem}</div>
        <form
          method="POST"
          onSubmit={(e) => { e.preventDefault(); handleAnswerSubmit(userAnswerInput) }}
        >
          <AnswerInput
            ref={answerInputRef}
            inputMode="none"
            maxLength={3}
            value={userAnswerInput}
            onKeyDown={(e) => {
              if (e.key === "Delete") clearUserAnswerInput();
            }}
            onChange={(e) => setUserAnswerInput(e.target.value)}
            disabled={isQuizPaused}
          />
        </form>
      </div>
      <Timer
        countDownSeconds={3}
        timeoutMessage="START"
        onFinish={handleStartTimerTimeout}
      />
      <Keypad
        disabled={isQuizPaused}
        onInputNumber={(inputNumber) => { focusOnAnswerInput(); appendUserAnswerInput(inputNumber) }}
        onEnter={() => handleAnswerSubmit(userAnswerInput)}
        onBackSpace={() => backspaceUserAnswerInput()}
        onClear={() => clearUserAnswerInput()}
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
