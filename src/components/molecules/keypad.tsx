import { type HtmlHTMLAttributes, type RefAttributes } from "react";
import { FaBackspace, FaEraser } from "react-icons/fa";
import KeypadButton from "../atoms/keypad-button";

type KeypadProps = {
  disabled?: boolean;
  onInputNumber: (number: string) => void;
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
  return (
    <div
      ref={ref}
      {...props}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-end gap-2">
          <KeypadButton
            glowOnKey="Delete"
            onClick={onClear}
            disabled={disabled}
          >
            <FaEraser className="text-xl" />
          </KeypadButton>
          <KeypadButton
            glowOnKey="Backspace"
            onClick={onBackSpace}
            disabled={disabled}
          >
            <FaBackspace className="text-xl" />
          </KeypadButton>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {numbers.map(((numberValue, index) => (
            <KeypadButton
              key={index}
              glowOnKey={numberValue}
              onClick={() => onInputNumber(numberValue)}
              disabled={disabled}
            >
              {numberValue}
            </KeypadButton>
          )))}
        </div>
        <div className="flex gap-2">
          <KeypadButton
            glowOnKey="0"
            onClick={() => onInputNumber?.call(undefined, "0")}
            className="flex-grow"
            disabled={disabled}
          >
            0
          </KeypadButton>
          <KeypadButton
            glowOnKey="Enter"
            onClick={onEnter}
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
