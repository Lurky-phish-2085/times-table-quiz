import clsx from "clsx";
import { useEffect, useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import Surface from "../atoms/surface";
import TimesColumnCheckbox from "../atoms/times-column-checkbox";

const MAX_TIMES_COLUMN = 12;

const timesColumns: Array<number> =
  Array.from({ length: MAX_TIMES_COLUMN }, (_, i) => i + 1);

type TimesColumnSelectorProps = {
  onSelect: (selectedColumns: Array<number>) => void;
};

function TimesColumnSelector({
  onSelect,
}: TimesColumnSelectorProps) {
  const [selectedColumns, setSelectedColumns] = useState<Array<number>>([]);
  const isAllSelected = selectedColumns.length === 0;

  useEffect(() => {
    if (isAllSelected) {
      onSelect(timesColumns);

      return;
    }

    onSelect(selectedColumns);
  }, [selectedColumns]);

  const selectAllColumns = () => setSelectedColumns([]);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    const selectedColumn = Number(value);

    setSelectedColumns((prev) =>
      checked ?
        [...prev, selectedColumn] :
        prev.filter((item) => item !== selectedColumn)
    );
  };

  return (
    <Surface
      className={clsx(
        "md:w-96 w-full max-sm:rounded-none",
        "grid place-items-center gap-4",
      )}
    >
      <div className="grid place-items-center gap-4 md:flex">
        <SelectAllColumnsCheckbox
          onClick={selectAllColumns}
          checked={isAllSelected}
        />
        <div>Or select specific ones:</div>
      </div>
      <div
        className="grid grid-cols-6 place-items-center gap-x-0.5 gap-y-1 px-8 w-full"
      >
        {timesColumns.map((timesColumn) => (
          <TimesColumnCheckbox
            name={`${timesColumn} times column`}
            value={timesColumn}
            onChange={handleSelect}
            checked={selectedColumns.includes(Number(timesColumn))}
          />
        ))}
      </div>
    </Surface>
  );
}

function SelectAllColumnsCheckbox({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label>
      <input
        className="hidden peer"
        type="checkbox"
        name="all times columns"
        {...props}
      />
      <div className={clsx(
        "py-4 px-8 border-2 border-gray-800 rounded-full",
        "text-gray-800 text-center font-bold",
        "transition-colors",
        "flex flex-col items-center justify-center",
        "peer-checked:bg-gray-950 peer-checked:text-white",
      )}
      >
        1 - 12
      </div>
    </label>
  );
}

export default TimesColumnSelector;
