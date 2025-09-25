import { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";

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
