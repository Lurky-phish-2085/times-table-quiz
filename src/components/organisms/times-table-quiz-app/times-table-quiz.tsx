import { clsx } from "clsx";
import { useEffect, useRef } from "react";
import AnswerInput from "../../atoms/answer-input";
import TimesProblemDisplay from "../../atoms/times-problem-display";
import Keypad from "../../molecules/keypad";
import QuizHUD from "../../molecules/quiz-hud";
import QuizStartCountdown from "../../molecules/quiz-start-countdown";
import { useAnswerInput, useTimesTableQuiz } from "./hooks";
import type { QuizConfiguration, QuizResultItem } from "./types";

export type TimesTableQuizProps = {
  config: QuizConfiguration;
  onQuizFinish: (results: Array<QuizResultItem>) => void;
};

function TimesTableQuiz({
  config,
  onQuizFinish,
}: TimesTableQuizProps) {
  const { quizTimerSeconds } = config;

  const {
    currentQuiz,
    score,
    remainingTimeSeconds,
    isQuizPaused,
    answerCurrentQuiz,
    startQuiz,
  } = useTimesTableQuiz({
    config,
    onQuizFinish: (results) => onQuizFinish(results),
  });

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

  const handleAnswerSubmit = (answer: string) => {
    clearUserAnswerInput();

    answerCurrentQuiz(answer);
  }

  const problem = currentQuiz?.problem;
  const isInteractionDisabled = isQuizPaused;

  return (
    <div
      className={clsx(
        "p-4 h-full flex flex-col gap-36",
      )}
    >
      <QuizHUD
        className="max-lg:hidden"
        score={score}
        quizTimerSeconds={quizTimerSeconds}
        quizTimerRemainingSeconds={remainingTimeSeconds}
      />
      <div
        className={clsx(
          "h-full flex flex-col lg:flex-row gap-4",
        )}
      >
        <QuizHUD
          className="lg:hidden"
          score={score}
          quizTimerSeconds={quizTimerSeconds}
          quizTimerRemainingSeconds={remainingTimeSeconds}
        />
        <div className="lg:px-24 flex-grow flex flex-col gap-6">
          <div className="relative">
            <TimesProblemDisplay
              multiplicand={problem?.multiplicand}
              multiplier={problem?.multiplier}
            />
            <QuizStartCountdown
              className="absolute top-[35%]"
              onEnd={startQuiz}
            />
          </div>
          <form
            className="self-center"
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
              handleAnswerSubmit(userAnswerInput)
            }}
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
              disabled={isInteractionDisabled}
            />
          </form>
        </div>
        <Keypad
          disabled={isInteractionDisabled}
          enterDisabled={!userAnswerInput}
          onInputNumber={(inputNumber) => {
            focusOnAnswerInput();
            appendUserAnswerInput(inputNumber)
          }}
          onEnter={() => {
            focusOnAnswerInput();
            handleAnswerSubmit(userAnswerInput)
          }}
          onBackSpace={() => backspaceUserAnswerInput()}
          onClear={() => clearUserAnswerInput()}
        />
      </div>
    </div>
  );
}

export default TimesTableQuiz;
