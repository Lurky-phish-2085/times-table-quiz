import clsx from "clsx";
import type { HTMLAttributes } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Button from "../../atoms/button";
import MistakesTable from "../../molecules/mistakes-table";
import type { QuizResultItem, TimesTableQuizAppScreenStates } from "./types";

type MistakeReviewProps = {
  data: Array<QuizResultItem>;
  onNavigate: (screenState: TimesTableQuizAppScreenStates) => void;
}
  & HTMLAttributes<HTMLDivElement>;

function MistakeReview({
  className,
  data: results,
  onNavigate
}: MistakeReviewProps) {
  const failedQuizItems = results
    .filter((result) => !result.correct)
    .map((failedQuiz) => failedQuiz.quizItem);

  const isFailedQuizItemsEmpty = failedQuizItems.length === 0;

  return (
    <div
      className={clsx(
        "h-full",
        "flex flex-col",
        className,
      )}
    >
      <div className="h-full p-4 flex flex-col gap-6">
        <div
          className="relative"
        >
          <Button
            variant="icon-outline-neutral"
            onClick={() => onNavigate("RESULT")}
          >
            <FaArrowLeft />
          </Button>
          <h1
            className={clsx(
              "absolute top-[50%] left-[50%]",
              "translate-x-[-50%] translate-y-[-50%]",
              "text-4xl font-bold text-center",
            )}
          >
            Mistakes
          </h1>
        </div>
        <p
          className="md:w-96 w-[90%] self-center text-center text-xl"
        >
          It's a good idea to write these out. We suggest
          3 times for each one.
        </p>
        {isFailedQuizItemsEmpty ? (
          <></>
        ) : (
          <MistakesTable
            data={failedQuizItems}
          />
        )
        }
      </div>
    </div>
  );
}

export default MistakeReview;
