import { useState, type HtmlHTMLAttributes, type KeyboardEvent, type RefAttributes } from "react";
import { FaBackspace, FaEraser } from "react-icons/fa";
import KeypadButton from "../atoms/keypad-button";

type KeypadProps = {
  disabled?: boolean;
  onInputNumber?: (number: string) => void;
  onEnter?: () => void;
  onBackSpace?: () => void;
  onClear?: () => void;
}
  & RefAttributes<HTMLDivElement>
  & HtmlHTMLAttributes<HTMLDivElement>;


const numbers: Array<string> = Array.from({ length: 9 }, (_, i) => String(i + 1));

function Keypad({
  disabled,
  onInputNumber,
  onEnter,
  onBackSpace,
  onClear,
  ref,
  ...props
}: KeypadProps) {
  const [keyPressed, setKeyPressed] = useState<string>("");
  const resetKeyPressed = () => setKeyPressed("");

  const recordKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    const { key } = e;

    setKeyPressed(key);
  };

  const submitKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    const { key } = e;

    const isNumber = Number.isFinite(Number(key));

    if (isNumber) {
      onInputNumber?.call(undefined, key);
    }
    if (key === "Enter") {
      onEnter?.call(undefined);
    }
    if (key === "Backspace") {
      onBackSpace?.call(undefined);
    }
    if (key === "Delete") {
      onClear?.call(undefined);
    }

    setTimeout(resetKeyPressed, 100);
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={recordKeyPress}
      onKeyUp={submitKeyPress}
      className="focus:outline-none"
      ref={ref}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-end gap-2">
          <KeypadButton
            onClick={onClear}
            highlighted={keyPressed.toLowerCase() === "delete"}
            disabled={disabled}
          >
            <FaEraser className="text-xl" />
          </KeypadButton>
          <KeypadButton
            onClick={onBackSpace}
            highlighted={keyPressed.toLowerCase() === "backspace"}
            disabled={disabled}
          >
            <FaBackspace className="text-xl" />
          </KeypadButton>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {numbers.map(((numberValue, index) => (
            <KeypadButton
              key={index}
              onClick={() => onInputNumber?.call(undefined, numberValue)}
              highlighted={keyPressed === numberValue}
              disabled={disabled}
            >
              {numberValue}
            </KeypadButton>
          )))}
        </div>
        <div className="flex gap-2">
          <KeypadButton
            onClick={() => onInputNumber?.call(undefined, "0")}
            highlighted={keyPressed === "0"}
            className="flex-grow"
            disabled={disabled}
          >
            0
          </KeypadButton>
          <KeypadButton
            onClick={onEnter}
            highlighted={keyPressed.toLowerCase() === "enter"}
            disabled={disabled}
          >
            ENTER
          </KeypadButton>
        </div>
      </div>
    </div >
  );
}

export default Keypad;
