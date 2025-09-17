import clsx from "clsx";
import { useEffect, useState, type ChangeEvent, type HtmlHTMLAttributes } from "react";
import OutlineButton from "../../atoms/outline-button";
import Surface from "../../atoms/surface";
import type { QuizConfiguration } from "./types";

const MAX_TIMES_COLUMN = 12;

const timesColumns: Array<string> =
  Array.from({ length: MAX_TIMES_COLUMN }, (_, i) => String(i + 1));

type TimesTableSelectorProps = {
  onSubmitInput?: (quizConfig: QuizConfiguration) => void;
}
  & HtmlHTMLAttributes<HTMLDivElement>;

function TimesTableSelector({
  onSubmitInput,
  className
}: TimesTableSelectorProps) {
  const [selectedColumns, setSelectedColumns] = useState<Array<number>>([]);
  const selectAllColumns = () => setSelectedColumns([]);

  const handleColumnSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    const isNumber = Number.isFinite(Number(value));
    if (!isNumber) return;

    setSelectedColumns((prev) =>
      checked ? [...prev, Number(value)] : prev.filter((item) => item !== Number(value))
    );
  };

  const [isAllSelected, setIsAllSelected] =
    useState<boolean>(selectedColumns.length === 0);

  useEffect(() => {
    setIsAllSelected(selectedColumns.length === 0);
  }, [selectedColumns]);

  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-8",
        className,
      )}
    >
      <div>Select Columns to Practice</div>
      <OutlineButton
        onClick={() => onSubmitInput?.call(undefined, { selectedTimesColumn: selectedColumns, quizTimerSeconds: 0 })}
      >
        Start Now
      </OutlineButton>
      <Surface
        className={clsx(
          "mx-4",
          "grid place-items-center gap-4",
          "self-stretch",
        )}
      >
        <div className="grid place-items-center gap-4 md:flex">
          <label>
            <input
              className="hidden peer"
              onClick={selectAllColumns}
              type="checkbox"
              name="all times columns"
              checked={isAllSelected}
            />
            <div className="peer-checked:bg-gray-950 peer-checked:text-white text-gray-800 py-4 px-8 border-2 border-gray-800 rounded-2xl flex flex-col items-center justify-center transition-colors">
              <span className="text-center text-sm font-bold">1 - 12</span>
            </div>
          </label>
          <div>Or select specific ones:</div>
        </div>
        <div
          className="grid grid-cols-6 gap-x-0.5 gap-y-1 px-8 w-full"
        >
          {timesColumns.map((timesColumn) => (
            <label className="w-10 h-10 flex">
              <input
                key={timesColumn}
                className="hidden peer"
                type="checkbox"
                name={`${timesColumn} times column`}
                value={timesColumn}
                onChange={handleColumnSelect}
                checked={selectedColumns.includes(Number(timesColumn))}
              />
              <div className="peer-checked:bg-gray-950 peer-checked:text-white text-gray-800 w-full h-full border-2 border-gray-800 rounded-full flex flex-col items-center justify-center transition-colors">
                <span className="text-center text-sm font-bold">{timesColumn}</span>
              </div>
            </label>
          ))}
        </div>
      </Surface>
    </div>
  );
}

export default TimesTableSelector;
