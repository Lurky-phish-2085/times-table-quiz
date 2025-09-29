import clsx from "clsx";
import type { HtmlHTMLAttributes } from "react";
import { FaTimes } from "react-icons/fa";
import Surface from "./surface";

type TimesProblemDisplayProps = {
  multiplicand?: number;
  multiplier?: number;
}
  & HtmlHTMLAttributes<HTMLDivElement>;

function TimesProblemDisplay({
  className,
  multiplicand,
  multiplier,
}: TimesProblemDisplayProps) {
  const isPropsUndefined = !multiplier || !multiplicand;

  return (
    <Surface
      className={clsx(
        "lg:h-28 md:h-72 h-28",
        "flex justify-center items-center",
        className,
      )}
    >
      <div
        className={clsx(
          "w-full",
          "flex justify-center items-center space-x-2 gap-4",
          { "hidden": isPropsUndefined }
        )}
      >
        <Operand
          className="text-right"
        >
          {multiplicand}
        </Operand>
        <FaTimes className="md:text-6xl lg:text-3xl text-3xl" />
        <Operand
          className="text-left"
        >
          {multiplier}
        </Operand>
      </div>
    </Surface>
  );
}

type OperandProps = HtmlHTMLAttributes<HTMLDivElement>;

function Operand({
  className,
  children,
}: OperandProps) {
  return (
    <div
      className={clsx(
        "w-[20%] md:text-9xl lg:text-6xl text-6xl font-bold",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default TimesProblemDisplay;
