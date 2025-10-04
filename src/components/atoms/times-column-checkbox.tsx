import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type TimesColumnCheckboxProps = InputHTMLAttributes<HTMLInputElement>;

function TimesColumnCheckbox({
  value,
  ...props
}: TimesColumnCheckboxProps) {
  return (
    <label className="w-10 h-10 flex">
      <input
        className="hidden peer"
        type="checkbox"
        value={value}
        {...props}
      />
      <div
        className={clsx(
          "w-full h-full border-2 border-black dark:border-white rounded-full",
          "text-center text-sm font-bold",
          "transition-colors",
          "flex flex-col items-center justify-center",
          "peer-checked:bg-black peer-checked:text-white",
          "dark:peer-checked:bg-neutral-light dark:peer-checked:text-black",
        )}
      >
        {value}
      </div>
    </label>
  );
}

export default TimesColumnCheckbox;
