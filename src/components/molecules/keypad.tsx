import clsx from "clsx";
import { type HtmlHTMLAttributes, type RefAttributes } from "react";
import { FaBackspace, FaEraser } from "react-icons/fa";
import Button from "../atoms/button";
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

const keypadButtonsClassName = "md:h-24 md:text-5xl lg:text-xl lg:h-auto text-xl";

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
            className={keypadButtonsClassName}
            key={index}
            glowOnKey={numberValue}
            onClick={() => onInputNumber(numberValue)}
            disabled={disabled}
          >
            {numberValue}
          </KeypadButton>
        )))}
        <KeypadButton
          className={keypadButtonsClassName}
          glowOnKey="Delete"
          onClick={onClear}
          disabled={disabled}
        >
          <FaEraser className="mx-auto" />
        </KeypadButton>
        <KeypadButton
          className={keypadButtonsClassName}
          glowOnKey="0"
          onClick={() => onInputNumber?.call(undefined, "0")}
          disabled={disabled}
        >
          0
        </KeypadButton>
        <KeypadButton
          className={keypadButtonsClassName}
          glowOnKey="Backspace"
          onClick={onBackSpace}
          disabled={disabled}
        >
          <FaBackspace className="mx-auto" />
        </KeypadButton>
      </div>
      <Button
        variant="filled-primary"
        onClick={onEnter}
        disabled={enterDisabled}
      >
        Submit Answer
      </Button>
    </div>
  );
}

export default Keypad;
