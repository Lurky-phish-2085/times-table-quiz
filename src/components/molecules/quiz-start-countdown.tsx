import { clsx } from "clsx";
import { useEffect, type HtmlHTMLAttributes } from "react";
import { useCountdown } from "usehooks-ts";
import CountdownNumber from "../atoms/countdown-number";

const QUIZ_START_COUNTDOWN_SECONDS = 3;

type QuizStartCountdownProps = {
  onEnd: () => void;
}
  & HtmlHTMLAttributes<HTMLDivElement>;

function QuizStartCountdown({ className, onEnd }: QuizStartCountdownProps) {
  const [count, { startCountdown }] = useCountdown({
    countStart: QUIZ_START_COUNTDOWN_SECONDS,
  });

  useEffect(() => startCountdown(), []);

  useEffect(() => {
    const isCountdownEnd = () => count === 0;

    if (isCountdownEnd()) {
      onEnd();
    }
  }, [count]);

  const countdownNumbers = Array.from({
    length: QUIZ_START_COUNTDOWN_SECONDS
  }, (_, i) => i + 1)
    .map((value) => (
      <CountdownNumber
        className={clsx(
          { "scale-0": count < value },
        )}
        value={value}
      />
    ));

  return (
    <div
      className={clsx(
        "flex flex-row-reverse gap-4",
        { "hidden": count === 0 },
        className,
      )}
    >
      {countdownNumbers}
    </div>
  );
}

export default QuizStartCountdown;
