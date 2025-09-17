import { clsx } from "clsx";
import { useEffect, useState, type HtmlHTMLAttributes } from "react";
import { useCountdown } from "usehooks-ts";

const HIDE_DELAY_MS = 500;

type TimerProps = {
  countDownSeconds: number;
  timeoutMessage?: string;
  paused?: boolean;
  hidingDisabled?: boolean;
  hideDelaySeconds?: number;
  onFinish?: () => void;
}
  & HtmlHTMLAttributes<HTMLDivElement>;

function Timer({
  countDownSeconds,
  timeoutMessage,
  paused,
  hidingDisabled,
  hideDelaySeconds = HIDE_DELAY_MS / 1000,
  onFinish,
  className,
  ...props
}: TimerProps) {
  const [count, { startCountdown, stopCountdown }] =
    useCountdown({
      countStart: countDownSeconds,
    });

  const [isHidden, setIsHidden] = useState<boolean>(false);

  const isFinished = () => count === 0;

  const hide = () => {
    setTimeout(() => {
      setIsHidden(true);
    }, hideDelaySeconds * 1000);
  };

  useEffect(() => {
    if (paused) {
      stopCountdown();
    } else {
      startCountdown();
    }
  }, [paused]);

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
