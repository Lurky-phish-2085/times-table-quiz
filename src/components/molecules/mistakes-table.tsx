import type { RefAttributes, TableHTMLAttributes } from "react";
import { FaTimes } from "react-icons/fa";
import type { QuizItem } from "../organisms/times-table-quiz-app/types";

type MistakesTableProps = {
  data: Array<QuizItem>;
}
  & TableHTMLAttributes<HTMLTableElement>
  & RefAttributes<HTMLTableElement>;

function MistakesTable({
  data,
  ref,
  ...props
}: MistakesTableProps) {
  return (
    <table
      className="w-full table-auto text-center uppercase"
      ref={ref}
      {...props}
    >
      <thead
        className="border border-transparent border-b-neutral text-xs font-black"
      >
        <tr>
          <th
            className="px-4 py-2 pb-9 w-1/2 text-left"
          >
            Question
          </th>
          <th
            className="text-primary px-6 py-2 w-1/3"
          >
            Your Answer
          </th>
          <th
            className="text-text-green dark:text-text-green-light px-4 py-2 w-1/3"
          >
            Correct Answer
          </th>
        </tr>
      </thead>
      <tbody
      >
        {data.map((item, index) => {
          const { userAnswer, answer } = item;
          const { multiplicand, multiplier } = item.problem;

          return (
            <tr
              key={index}
              className="text-xl"
            >
              <td
                className="text-left px-4 py-4"
              >
                <div className="flex items-center gap-2">
                  <span>{multiplicand}</span>
                  <FaTimes className="text-xs" />
                  <span>{multiplier}</span>
                </div>
              </td>
              <td>{userAnswer}</td>
              <td>{answer}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default MistakesTable;
