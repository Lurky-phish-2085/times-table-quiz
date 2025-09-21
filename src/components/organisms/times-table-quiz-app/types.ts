export type TimesTableQuizAppScreenStates = "SELECTION"
  | "QUIZ"
  | "RESULT"
  | "MISTAKES";

export type TimesProblem = {
  multiplicand: number;
  multiplier: number;
};

export type QuizItem = {
  problem: TimesProblem;
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
