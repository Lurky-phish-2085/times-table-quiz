import type { QuizItem, TimesProblem } from "./types";

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateQuiz = (timesColumns: Array<number>): QuizItem => {
  const MIN_MULTIPLIER = 1;
  const MAX_MULTIPLIER = 12;

  const getRandomMultiplicand = (): number =>
    timesColumns[getRandomInt(0, timesColumns.length - 1)];

  const multiplicand = getRandomMultiplicand();
  const multiplier = getRandomInt(MIN_MULTIPLIER, MAX_MULTIPLIER);

  const operands: Array<number> = [
    multiplicand,
    multiplier,
  ];

  const shouldSwapOperands = (): boolean => getRandomInt(0, 1) > 0;

  const swapOperands = () => {
    const formerLeftOperand = operands[0];

    operands[0] = operands[1];
    operands[1] = formerLeftOperand;
  };

  if (shouldSwapOperands()) {
    swapOperands();
  }

  const problem: TimesProblem = {
    multiplicand: operands[0],
    multiplier: operands[1],
  }
  const answer: string = String(operands[0] * operands[1]);

  return {
    problem,
    answer,
    userAnswer: "",
  };
};
