import clsx from "clsx";
import type { HtmlHTMLAttributes, RefAttributes } from "react";

type SurfaceProps = HtmlHTMLAttributes<HTMLDivElement>
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
        "border-2 rounded-2xl",
        "bg-neutral-100",
        className,
      )}
      {...props}
    >
    </div>
  );
}

export default Surface;
