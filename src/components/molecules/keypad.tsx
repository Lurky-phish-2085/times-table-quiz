import clsx from "clsx";
import { type HtmlHTMLAttributes, type RefAttributes } from "react";
import { FaBackspace, FaEraser } from "react-icons/fa";
import FilledButton from "../atoms/filled-button";
import KeypadButton from "../atoms/keypad-button";

type KeypadProps = {
  disabled?: boolean;
  enterDisabled?: boolean;
  onInputNumber: (number: string) => void;
  onEnter?: () => void;
  onBackSpace?: () => void;
  onClear?: () => void;
}
  & RefAttributes<HTMLDivElement>
  & HtmlHTMLAttributes<HTMLDivElement>;


const numbers: Array<string> = Array
  .from({ length: 9 }, (_, i) => String(i + 1));

function Keypad({
  disabled,
  enterDisabled,
  onInputNumber,
  onEnter,
  onBackSpace,
  onClear,
  ref,
  ...props
}: KeypadProps) {
  return (
    <div
      className="flex flex-col gap-4"
      ref={ref}
      {...props}
    >
      <div
        className={clsx(
          "grid grid-cols-3 gap-2",
        )}
      >
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
        <KeypadButton
          glowOnKey="Delete"
          onClick={onClear}
          disabled={disabled}
        >
          <FaEraser className="text-xl mx-auto" />
        </KeypadButton>
        <KeypadButton
          glowOnKey="0"
          onClick={() => onInputNumber?.call(undefined, "0")}
          disabled={disabled}
        >
          0
        </KeypadButton>
        <KeypadButton
          glowOnKey="Backspace"
          onClick={onBackSpace}
          disabled={disabled}
        >
          <FaBackspace className="text-xl mx-auto" />
        </KeypadButton>
      </div>
      <FilledButton
        onClick={onEnter}
        disabled={enterDisabled}
      >
        Submit Answer
      </FilledButton>
    </div>
  );
}

export default Keypad;
