import clsx from "clsx";
import TimesTableQuizApp from "./components/organisms/times-table-quiz-app/times-table-quiz-app";

function App() {
  return (
    <TimesTableQuizApp
      className={clsx(
        "bg-white dark:bg-background-dark",
        "text-black dark:text-text-light",
      )}
    />
  );
}

export default App;
