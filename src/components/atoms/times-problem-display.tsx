import clsx from "clsx";
import type { HtmlHTMLAttributes, PropsWithChildren } from "react";
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
        "h-28",
        "flex justify-center items-center",
        className,
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-4",
          { "hidden": isPropsUndefined }
        )}
      >
        <Operand>{multiplicand}</Operand>
        <FaTimes className="text-3xl" />
        <Operand>{multiplier}</Operand>
      </div>
    </Surface>
  );
}

function Operand({ children }: PropsWithChildren) {
  return (
    <div
      className="text-6xl font-bold"
    >
      {children}
    </div>
  );
}

export default TimesProblemDisplay;
