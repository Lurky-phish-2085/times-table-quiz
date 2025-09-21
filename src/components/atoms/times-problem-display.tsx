import clsx from "clsx";
import { FaTimes } from "react-icons/fa";
import Surface from "./surface";

type TimesProblemDisplayProps = {
  mutiplicand?: number;
  multiplier?: number;
};

function TimesProblemDisplay({
  mutiplicand,
  multiplier
}: TimesProblemDisplayProps) {
  const invalidProps = !multiplier || !mutiplicand;

  return (
    <Surface
      className={clsx(
        "h-28",
        "flex justify-center items-center",
      )}
    >
      <div
        className={clsx(
          { "hidden": invalidProps },
          "flex items-center gap-4",
        )}
      >
        <div
          className="text-6xl font-bold"
        >
          {mutiplicand}
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
