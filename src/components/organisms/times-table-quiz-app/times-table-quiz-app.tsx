import { useState } from "react";
import MistakeReview from "./mistake-review";
import QuizResults from "./quiz-results";
import TimesTableQuiz from "./times-table-quiz";
import TimesTableSelection from "./times-table-selection.tsx";
import type { QuizConfiguration, QuizResultItem, TimesTableQuizAppScreenStates } from "./types";

function TimesTableQuizApp() {
  const [screenState, setScreenState] = useState<TimesTableQuizAppScreenStates>("SELECTION");

  const [config, setConfig] = useState<QuizConfiguration>({
    selectedTimesColumns: [],
    quizTimerSeconds: 60,
  });

  const [results, setResults] = useState<Array<QuizResultItem>>([]);

  if (screenState === "SELECTION") {
    return (
      <TimesTableSelection
        onSubmitInput={(selectedColumns) => {
          setConfig((prev) => {
            return {
              ...prev,
              selectedTimesColumns: selectedColumns,
            };
          });

          setScreenState("QUIZ");
        }}
      />
    );
  }

  if (screenState === "QUIZ") {
    return (
      <TimesTableQuiz
        config={config}
        onQuizFinish={(results: Array<QuizResultItem>) => {
          setResults(results);

          setScreenState("RESULT");
        }}
      />
    );
  }

  if (screenState === "RESULT") {
    return (
      <QuizResults
        data={results}
        onNavigate={(nextScreenState) => setScreenState(nextScreenState)}
      />
    );
  }

  if (screenState === "MISTAKES") {
    return (
      <MistakeReview
        data={results}
        onNavigate={(nextScreenState) => setScreenState(nextScreenState)}
      />
    );
  }
}

export default TimesTableQuizApp;
