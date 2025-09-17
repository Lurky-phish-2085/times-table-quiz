import { useState, type Dispatch, type SetStateAction } from "react";

const MAX_INPUT_VALUE_LENGTH = 3;

type UseAnswerInputHookType = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  append: (value: string) => void;
  backspace: () => void;
  clear: () => void;
};

export const useAnswerInput = (): UseAnswerInputHookType => {
  const [inputValue, setInputValue] = useState<string>("");

  const isNumber = (number: string) => Number.isFinite(Number(number));
  const isInputValueMaxLength = inputValue.length === MAX_INPUT_VALUE_LENGTH;

  const append = (value: string) => {
    if (isInputValueMaxLength) return;

    if (isNumber(value)) {
      setInputValue((prev) => prev + value);
    }
  }

  const backspace = () => setInputValue((prev) => prev.slice(0, -1));
  const clear = () => setInputValue("");

  return {
    inputValue,
    setInputValue,
    append,
    backspace,
    clear,
  };
}
