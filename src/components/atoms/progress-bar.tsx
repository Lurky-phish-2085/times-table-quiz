import { clsx } from "clsx";
import { useEffect, useRef } from "react";

const MIN_PROGRESS_VALUE = 0;
const MAX_PROGRESS_VALUE = 100;

const clamp = (value: number, min: number, max: number) =>
  Math.floor(Math.min(Math.max(value, min), max));

type ProgressBarProps = {
  progress: number;
};

function ProgressBar({
  progress,
}: ProgressBarProps) {
  const innerBarRef = useRef<HTMLDivElement>(null);

  const innerBarWidth = `${clamp(progress, MIN_PROGRESS_VALUE, MAX_PROGRESS_VALUE)}`;

  useEffect(() => {
    if (innerBarRef?.current) {
      innerBarRef.current.style.width = `${innerBarWidth}%`;
    }
  }, [progress]);

  return (
    <div
      className={clsx(
        "h-[0.2rem]",
        "border rounded-full",
        "bg-neutral-light dark:bg-neutral-dark dark:border-background-dark",
      )}
    >
      <div
        ref={innerBarRef}
        className={clsx(
          "h-full",
          "bg-primary",
          "transition-all, duration-500",
        )}
      >
      </div>
    </div>
  );
}

export default ProgressBar;
