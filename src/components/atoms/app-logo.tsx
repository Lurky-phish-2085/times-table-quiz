import clsx from "clsx";
import type { HTMLAttributes } from "react";

type AppLogoProps = HTMLAttributes<HTMLDivElement>;

function AppLogo({
  className,
  ...props
}: AppLogoProps) {
  return (
    <div
      className={clsx(
        "text-xl text-primary font-bold",
        className,
      )}
      {...props}
    >
      TimesTableQuiz
    </div>
  );
}

export default AppLogo;
