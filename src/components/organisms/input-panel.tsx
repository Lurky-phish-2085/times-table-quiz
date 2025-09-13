import { clsx } from "clsx";
import { useEffect, useRef, useState, type HtmlHTMLAttributes } from "react";
import InputDisplay from "../atoms/input-display";
import Keypad from "../molecules/keypad";

type InputPanelProps = {
  disabled?: boolean;
  hideInputDisplay?: boolean;
  onInputChange?: (input: string) => void;
  onSubmitInput?: (input: string) => void;
}
  & HtmlHTMLAttributes<HTMLDivElement>;

function InputPanel({
  className,
  disabled,
  hideInputDisplay,
  onInputChange,
  onSubmitInput
}: InputPanelProps) {
  const [input, setInput] = useState<string>("");
  const clearInput = () => setInput("");

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const keypadRef = useRef<HTMLDivElement>(null);

  const focusOnKeypad = () => {
    keypadRef?.current?.focus();
  };

  useEffect(() => {
    focusOnKeypad();
  }, []);

  useEffect(() => {
    onInputChange?.call(undefined, input);
  }, [input]);


  const handleNumberInput = (numberInput: string) => {
    setInput((prev) => prev + numberInput);
  };

  const handleBackSpace = () =>
    setInput((prev) => prev.substring(0, prev.length - 1));

  const handleSubmit = () => {
    onSubmitInput?.call(undefined, input);

    clearInput();
  };

  return (
    <div
      className={clsx(
        "flex flex-col gap-8",
        className,
      )}
      onClick={() => setTimeout(focusOnKeypad, 25)}
    >
      <InputDisplay
        className="w-36 self-center"
        content={input}
        highlighted={isFocused}
        hidden={hideInputDisplay}
      />
      <Keypad
        ref={keypadRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onInputNumber={handleNumberInput}
        onEnter={handleSubmit}
        onBackSpace={handleBackSpace}
        onClear={clearInput}
        disabled={disabled}
      />
    </div >
  );
}

export default InputPanel;
