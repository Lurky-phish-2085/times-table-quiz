export type TimesTableQuizAppScreenStates = "SELECTION"
  | "QUIZ"
  | "RESULT"
  | "MISTAKES";

export type QuizConfiguration = {
  selectedTimesColumns: Array<number>;
  quizTimerSeconds: number;
};

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

export type QuizResultMedal = {
  name: string,
  medalImage: string,
  title: string;
  subTitleMessage: string;
};
