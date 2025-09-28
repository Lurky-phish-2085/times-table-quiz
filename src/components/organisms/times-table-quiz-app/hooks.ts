import { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";
import type { QuizConfiguration, QuizItem, QuizResultItem } from "./types";
import { generateQuiz } from "./utils";

const MAX_ANSWER_INPUT_VALUE_LENGTH = 3;

type UseAnswerInputHookType = {
  inputValue: string;
  setInputValue: (value: string) => void;
  append: (value: string) => void;
  backspace: () => void;
  clear: () => void;
};

export const useAnswerInput = (): UseAnswerInputHookType => {
  const [inputValue, setValue] = useState<string>("");

  const isNumber = (number: string) => Number.isFinite(Number(number));
  const isInputValueMaxLength = inputValue.length === MAX_ANSWER_INPUT_VALUE_LENGTH;

  const setInputValue = (value: string) => {
    if (isInputValueMaxLength) return;

    if (isNumber(value)) {
      setValue(value.trim());
    }
  };

  const append = (value: string) => setInputValue(inputValue + value);
  const backspace = () => setValue((prev) => prev.slice(0, -1));
  const clear = () => setValue("");

  return {
    inputValue,
    setInputValue,
    append,
    backspace,
    clear,
  };
};

const COUNTDOWN_END_DELAY_MS = 1000;

type UseQuizTimerHookType = {
  remainingSeconds: number;
  startCountdown: () => void;
  stopCountdown: () => void;
};

type UseQuizTimerHookProps = {
  countStart: number;
  paused: boolean;
  onEnd: () => void;
};

export const useQuizTimer = ({
  countStart,
  paused,
  onEnd,
}: UseQuizTimerHookProps): UseQuizTimerHookType => {
  const [
    count,
    { startCountdown, stopCountdown },
  ] = useCountdown({ countStart });

  const isCountDownEnd = count === 0;

  useEffect(() => {
    if (isCountDownEnd) {
      setTimeout(() => onEnd(), COUNTDOWN_END_DELAY_MS);
    }
  }, [count]);

  useEffect(() => paused ? stopCountdown() : startCountdown(), [paused]);

  return {
    remainingSeconds: count,
    startCountdown,
    stopCountdown,
  };
};

type UseTimesTableQuizHookProps = {
  config: QuizConfiguration;
  onQuizFinish?: (results: Array<QuizResultItem>) => void;
};

type UseTimesTableQuizHookType = {
  currentQuiz?: QuizItem;
  score: number;
  remainingTimeSeconds: number;
  isQuizPaused: boolean;
  answerCurrentQuiz: (answer: string) => void;
  startQuiz: () => void;
  pauseQuiz: () => void;
};

export const useTimesTableQuiz = ({
  config,
  onQuizFinish = () => { },
}: UseTimesTableQuizHookProps): UseTimesTableQuizHookType => {
  const { selectedTimesColumns, quizTimerSeconds } = config;

  const [currentQuiz, setCurrentQuiz] = useState<QuizItem | undefined>(undefined);
  const [quizResults, setQuizResults] = useState<Array<QuizResultItem>>([]);
  const [isQuizPaused, setIsQuizPaused] = useState<boolean>(true);

  const score: number = quizResults.filter((quiz) => quiz.correct).length;

  const { remainingSeconds: remainingTimeSeconds } = useQuizTimer({
    countStart: quizTimerSeconds,
    paused: isQuizPaused,
    onEnd: () => onQuizFinish(quizResults),
  });

  useEffect(() => {
    if (quizTimerSeconds === 0) {
      setIsQuizPaused(true);
    }
  }, [quizTimerSeconds]);

  const createNewQuiz = () => {
    let quiz = generateQuiz(selectedTimesColumns);

    const isQuizGeneratedRecently = (): boolean => {
      const isResultsEmpty = quizResults.length === 0;

      if (isResultsEmpty) return false;

      const recentPreviousResult = quizResults
        .map((result) => result.quizItem)
        .at(-1);

      return quiz.problem === recentPreviousResult?.problem;
    };

    while (isQuizGeneratedRecently()) {
      quiz = generateQuiz(selectedTimesColumns);
    }

    setCurrentQuiz(quiz);
  };

  const evaluateQuizResult = () => {
    if (!currentQuiz) return;

    const { userAnswer, answer } = currentQuiz;

    const result: QuizResultItem = {
      quizItem: currentQuiz,
      correct: userAnswer === answer,
    };

    setQuizResults((prev) => [...prev, result]);
  };

  const startQuiz = () => {
    if (!currentQuiz) {
      createNewQuiz();
    }

    setIsQuizPaused(false);
  };

  const pauseQuiz = () => setIsQuizPaused(true);

  const answerCurrentQuiz = (answer: string) => {
    if (!currentQuiz) return;
    if (!answer) return;

    currentQuiz.userAnswer = answer;
    evaluateQuizResult();
    createNewQuiz();
  };

  return {
    currentQuiz,
    score,
    remainingTimeSeconds,
    isQuizPaused,
    answerCurrentQuiz,
    startQuiz,
    pauseQuiz,
  }
};
