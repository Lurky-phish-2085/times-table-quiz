import clsx from "clsx";
import type { HTMLAttributes, RefAttributes } from "react";

type SurfaceProps = HTMLAttributes<HTMLDivElement>
  & RefAttributes<HTMLDivElement>;

function Surface({
  className,
  ref,
  ...props
}: SurfaceProps) {
  return (
    <div
      className={clsx(
        "py-8",
        "border-2 rounded-2xl dark:border-neutral",
        "bg-surface dark:bg-surface-dark",
        className,
      )}
      {...props}
    >
    </div>
  );
}

export default Surface;
