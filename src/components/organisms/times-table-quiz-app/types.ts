export type TimesTableQuizAppScreenStates = "SELECTION"
  | "QUIZ"
  | "RESULT"
  | "MISTAKES";

export type QuizItem = {
  problem: string;
  answer: string;
  userAnswer: string;
};

export type QuizResultItem = {
  quizItem: QuizItem;
  correct: boolean;
};

export type QuizConfiguration = {
  selectedTimesColumn: Array<number>;
  quizTimerSeconds: number;
};
