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
      <div>Select Columns to Practice</div>
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
