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
          "w-full h-full border-2 border-gray-800 rounded-full",
          "text-gray-800 text-center text-sm font-bold",
          "transition-colors",
          "flex flex-col items-center justify-center",
          "peer-checked:bg-gray-950 peer-checked:text-white",
        )}
      >
        {value}
      </div>
    </label>
  );
}

export default TimesColumnCheckbox;
