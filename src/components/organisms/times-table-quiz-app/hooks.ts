import { useEffect, useState } from "react";
import { useCountdown } from "usehooks-ts";

const MAX_INPUT_VALUE_LENGTH = 3;

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
  const isInputValueMaxLength = inputValue.length === MAX_INPUT_VALUE_LENGTH;

  const setInputValue = (value: string) => {
    if (isInputValueMaxLength) return;

    if (isNumber(value)) {
      setValue(value);
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
}

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

export const useQuizTimer = ({ countStart, paused, onEnd }: UseQuizTimerHookProps): UseQuizTimerHookType => {
  const [
    count,
    { startCountdown, stopCountdown },
  ] = useCountdown({ countStart });

  useEffect(() => {
    if (count === 0) {
      setTimeout(() => onEnd(), 1000);
    }
  }, [count]);

  useEffect(() => paused ? stopCountdown() : startCountdown(), [paused]);

  return {
    remainingSeconds: count,
    startCountdown,
    stopCountdown,
  };
}
