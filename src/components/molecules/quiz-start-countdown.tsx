import { clsx } from "clsx";
import { useEffect, useState, type HtmlHTMLAttributes } from "react";
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

  const [isHidden, setIsHidden] = useState<boolean>(false);

  useEffect(() => startCountdown(), []);

  useEffect(() => {
    const isCountdownEnd = () => count === 0;

    if (isCountdownEnd()) {
      setTimeout(() => {
        setIsHidden(true);
        onEnd();
      }, 250);
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
        { "hidden": isHidden },
        className,
      )}
    >
      {countdownNumbers}
    </div>
  );
}

export default QuizStartCountdown;
