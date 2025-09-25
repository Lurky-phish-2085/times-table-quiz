import clsx from "clsx";
import type { HtmlHTMLAttributes } from "react";
import TimerProgressIndicatorBar from "./timer-progress-indicataor-bar";

type QuizHUDProps = {
  score: number;
  quizTimerSeconds: number;
  quizTimerRemainingSeconds: number;
}
  & HtmlHTMLAttributes<HTMLDivElement>;

function QuizHUD({
  className,
  score,
  quizTimerSeconds,
  quizTimerRemainingSeconds,
}: QuizHUDProps) {
  return (
    <div
      className={clsx(
        "flex flex-col",
        className,
      )}
    >
      <div className="flex justify-between text-xs font-bold text-gray-500">
        <div>TIME: {quizTimerRemainingSeconds}</div>
        <div>SCORE: {score}</div>
      </div>
      <TimerProgressIndicatorBar
        timerInitialSeconds={quizTimerSeconds}
        remainingTimerSeconds={quizTimerRemainingSeconds}
      />
    </div>
  );
}

export default QuizHUD;
