import clsx from "clsx";
import { useState, type HtmlHTMLAttributes } from "react";
import OutlineButton from "../../atoms/outline-button";
import TimesColumnSelector from "../../molecules/times-column-selector";

type TimesTableSelectionProps = {
  onSubmitInput: (selectedTimesColumn: Array<number>) => void;
}
  & HtmlHTMLAttributes<HTMLDivElement>;

function TimesTableSelection({
  onSubmitInput,
  className
}: TimesTableSelectionProps) {
  const [selectedColumns, setSelectedColumns] = useState<Array<number>>([]);

  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center gap-8",
        className,
      )}
    >
      <h1
        className="text-3xl font-extrabold"
      >
        Test your Times Tables
      </h1>
      <p
        className="w-[95%] text-xl text-center font-light"
      >
        Have you mastered your times tables?
        See how many you can get right within 60 seconds.
      </p>
      <OutlineButton
        onClick={() => onSubmitInput(selectedColumns)}
      >
        Start Now
      </OutlineButton>
      <TimesColumnSelector
        onSelect={(columns) => setSelectedColumns(columns)}
      />
    </div>
  );
}

export default TimesTableSelection;
