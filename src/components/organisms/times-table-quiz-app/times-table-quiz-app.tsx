import { useState } from "react";
import QuizResults from "./quiz-results";
import TimesTableQuiz from "./times-table-quiz";
import TimesTableSelector from "./times-table-selector";
import type { QuizConfiguration, QuizResultItem, TimesTableQuizAppScreenStates } from "./types";
import MistakeReview from "./mistake-review";

function TimesTableQuizApp() {
  const [screenState, setScreenState] = useState<TimesTableQuizAppScreenStates>("SELECTION");

  const [config, setConfig] = useState<QuizConfiguration>({
    selectedTimesColumn: [],
    quizTimerSeconds: 60,
  });

  const [results, setResults] = useState<Array<QuizResultItem>>([]);

  if (screenState === "SELECTION") {
    return <TimesTableSelector onSubmitInput={(config) => {
      if (config.selectedTimesColumn.length === 0) {
        config.selectedTimesColumn = Array.from({ length: 12 }, (_, i) => i + 1);
      }

      if (config.quizTimerSeconds <= 0) {
        config.quizTimerSeconds = 10;
      }

      setConfig(config);

      setScreenState("QUIZ");
    }} />;
  }

  if (screenState === "QUIZ") {
    return <TimesTableQuiz
      config={config}
      onQuizFinish={(results: Array<QuizResultItem>) => {
        setResults(results);

        setScreenState("RESULT");
      }}
    />;
  }

  if (screenState === "RESULT") {
    return <QuizResults
      data={results}
      onNavigate={(nextScreenState) => setScreenState(nextScreenState)}
    />;
  }

  if (screenState === "MISTAKES") {
    return <MistakeReview data={results} onNavigate={(nextScreenState) => setScreenState(nextScreenState)} />
  }
}

export default TimesTableQuizApp;
