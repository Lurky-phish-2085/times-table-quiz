import { useEffect, useState } from "react";
import ProgressBar from "../atoms/progress-bar";

type TimerProgressIndicatorBarProps = {
  timerInitialSeconds: number;
  remainingTimerSeconds: number;
};

function TimerProgressIndicatorBar({
  timerInitialSeconds,
  remainingTimerSeconds,
}: TimerProgressIndicatorBarProps) {

  const calculateProgress = () => 100 * (remainingTimerSeconds / timerInitialSeconds);

  const [progress, setProgress] = useState<number>(calculateProgress());

  useEffect(() => setProgress(calculateProgress()), [remainingTimerSeconds]);

  return (
    <ProgressBar progress={progress} />
  );
}

export default TimerProgressIndicatorBar;
