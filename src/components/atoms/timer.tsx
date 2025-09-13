import { clsx } from "clsx";
import { useEffect, useState, type HtmlHTMLAttributes } from "react";
import { useInterval } from "usehooks-ts";

type TimerProps = {
  countDownSeconds: number;
  timeoutMessage?: string;
  paused?: boolean;
  hidingDisabled?: boolean;
  hideOnTimeoutDelaySeconds?: number;
  onFinish?: () => void;
}
  & HtmlHTMLAttributes<HTMLDivElement>;

const ONE_SECOND = 1000;
const HIDE_DELAY_MS = 500;

function Timer({
  countDownSeconds,
  timeoutMessage,
  paused,
  hidingDisabled,
  hideOnTimeoutDelaySeconds = HIDE_DELAY_MS / 1000,
  onFinish,
  className,
  ...props
}: TimerProps) {
  const [count, setCount] = useState<number>(countDownSeconds);
  const decrementCount = () => setCount((prev) => prev - 1);

  const [isHidden, setIsHidden] = useState<boolean>(false);

  const isFinished = () => count === 0;

  const hide = () => {
    setTimeout(() => {
      setIsHidden(true);
    }, hideOnTimeoutDelaySeconds * 1000);
  };

  useInterval(() => {
    decrementCount();

  }, !(isFinished() || paused) ? ONE_SECOND : null);

  useEffect(() => {
    if (isFinished()) {
      hide();
      onFinish?.call(undefined);
    }
  }, [count]);

  return (
    <div
      className={clsx(
        "text-center text-2xl font-bold",
        { "hidden": isHidden && !hidingDisabled },
        className,
      )}
      {...props}
    >
      {isFinished() ? timeoutMessage ?? count : count}
    </div>
  );
}

export default Timer;
