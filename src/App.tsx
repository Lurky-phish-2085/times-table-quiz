import clsx from "clsx";
import TimesTableQuizApp from "./components/organisms/times-table-quiz-app/times-table-quiz-app";
import { ThemeProvider } from "./contexts/theme-context";

function App() {
  return (
    <ThemeProvider>
      <TimesTableQuizApp
        className={clsx(
          "bg-white dark:bg-background-dark",
          "text-black dark:text-text-light",
        )}
      />
    </ThemeProvider>
  );
}

export default App;
