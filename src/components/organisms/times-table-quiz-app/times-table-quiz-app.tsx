import clsx from "clsx";
import { useEffect, useState, type HTMLAttributes, type ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";
import Header from "../header.tsx";
import MistakeReview from "./mistake-review";
import QuizResults from "./quiz-results";
import TimesTableQuiz from "./times-table-quiz";
import TimesTableSelection from "./times-table-selection.tsx";
import type { QuizConfiguration, QuizResultItem, TimesTableQuizAppScreenStates } from "./types";

type TimesTableQuizAppProps = HTMLAttributes<HTMLDivElement>;

function TimesTableQuizApp({
  className,
}: TimesTableQuizAppProps) {
  const [screenState, setScreenState] = useState<TimesTableQuizAppScreenStates | null>(null);

  const [config, setConfig] = useState<QuizConfiguration>({
    selectedTimesColumns: [],
    quizTimerSeconds: 60,
  });

  const [results, setResults] = useState<Array<QuizResultItem>>([]);

  const [isTransitionAnimating, setIsTransitionAnimating] = useState<boolean>(false);

  const navigate = (to: TimesTableQuizAppScreenStates) => {
    setIsTransitionAnimating(true);

    setTimeout(() => {
      setScreenState(to);

      setIsTransitionAnimating(false);
    }, 500);
  };

  useEffect(() => navigate("SELECTION"), []);

  let screen: ReactNode = <></>;

  if (screenState === "SELECTION") {
    screen = (
      <TimesTableSelection
        className="md:w-[90%] mx-auto pt-4"
        onSubmitInput={(selectedColumns) => {
          setConfig((prev) => {
            return {
              ...prev,
              selectedTimesColumns: selectedColumns,
            };
          });

          navigate("QUIZ");
        }}
      />
    );
  }

  if (screenState === "QUIZ") {
    screen = (
      <TimesTableQuiz
        config={config}
        onQuizFinish={(results: Array<QuizResultItem>) => {
          setResults(results);

          navigate("RESULT");
        }}
      />
    );
  }

  if (screenState === "RESULT") {
    screen = (
      <QuizResults
        data={results}
        onNavigate={(nextScreenState) => navigate(nextScreenState)}
      />
    );
  }

  if (screenState === "MISTAKES") {
    screen = (
      <MistakeReview
        className="md:w-[90%] mx-auto pt-4"
        data={results}
        onNavigate={(nextScreenState) => navigate(nextScreenState)}
      />
    );
  }

  const isScreenLarge = useMediaQuery("(min-width: 1024px)");
  const isHeaderHidden = screenState === "QUIZ" && !isScreenLarge;

  return (
    <div
      className={clsx(
        "h-dvh",
        className,
      )}
    >
      <Header
        hidden={isHeaderHidden}
      />
      <div
        className={clsx(
          "h-full",
          { "mt-20": !isHeaderHidden },
          "transition-all duration-500",
          { "opacity-0 scale-90": isTransitionAnimating },
        )}
      >
        {screen}
      </div>
    </div>
  );
}

export default TimesTableQuizApp;
