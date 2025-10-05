import clsx from "clsx";
import type { HTMLAttributes } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useScrollDirection } from "../../hooks/use-scroll-direction";
import AppLogo from "../atoms/app-logo";
import Button from "../atoms/button";
import ThemeToggle from "../molecules/theme-toggle";

type HeaderProps = HTMLAttributes<HTMLElement>;

function Header({
  hidden,
  ...props
}: HeaderProps) {
  const scrollDirection = useScrollDirection();

  const isHidden = hidden || scrollDirection == "down";

  return (
    <header
      className={clsx(
        "w-full py-2 px-4",
        "fixed top-0 left-0",
        "bg-inherit shadow dark:shadow-none",
        "transition-transform duration-300",
        { "-translate-y-full": isHidden },
        { "translate-y-0": !isHidden },
        "z-50",
      )}
      {...props}
    >
      <div
        className="flex items-center"
      >
        <a
          className="mr-auto"
          href="/"
        >
          <AppLogo />
        </a>
        <ThemeToggle />
        <Button
          variant="icon-ghost"
        >
          <FaInfoCircle className="text-xl" />
        </Button>
      </div>
    </header>
  );
}

export default Header;
