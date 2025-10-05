import type { ButtonHTMLAttributes } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../contexts/theme-context";
import Button from "../atoms/button";

type ThemeToggleProps = ButtonHTMLAttributes<HTMLButtonElement>;

function ThemeToggle({
  ...props
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="icon-ghost"
      onClick={toggleTheme}
      {...props}
    >
      {theme === "dark" ?
        <FaSun /> :
        <FaMoon />
      }
    </Button>
  );
}

export default ThemeToggle;
