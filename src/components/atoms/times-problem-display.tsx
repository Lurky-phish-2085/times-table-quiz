import clsx from "clsx";
import { FaTimes } from "react-icons/fa";
import Surface from "./surface";

type TimesProblemDisplayProps = {
  multiplicand?: number;
  multiplier?: number;
};

function TimesProblemDisplay({
  multiplicand,
  multiplier
}: TimesProblemDisplayProps) {
  const isPropsUndefined = !multiplier || !multiplicand;

  return (
    <Surface
      className={clsx(
        "h-28",
        "flex justify-center items-center",
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-4",
          { "hidden": isPropsUndefined }
        )}
      >
        <div
          className="text-6xl font-bold"
        >
          {multiplicand}
        </div>
        <FaTimes className="text-3xl" />
        <div
          className="text-6xl font-bold"
        >
          {multiplier}
        </div>
      </div>
    </Surface>
  );
}

export default TimesProblemDisplay;
