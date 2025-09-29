import BronzeMedal from "../../../assets/bronze-medal.svg";
import GoldMedal from "../../../assets/gold-medal.svg";
import SilverMedal from "../../../assets/silver-medal.svg";
import type { QuizResultMedal } from "./types";

export const MIN_BRONZE_SCORE = 0;
export const MIN_SILVER_SCORE = 15;
export const MIN_GOLD_SCORE = 28;

export const BRONZE_MEDAL: QuizResultMedal = {
  medalImage: BronzeMedal,
  name: "Bronze Medal",
  title: "Keep it up",
  subTitleMessage: "Aim to get at least 15 correct. Keep practicing. " +
    "You got this!",
};

export const SILVER_MEDAL: QuizResultMedal = {
  medalImage: SilverMedal,
  name: "Silver Medal",
  title: "Nice work",
  subTitleMessage: "You're on your way. There's still some " +
    "room for improvement. " +
    "Let's go!",
};

export const GOLD_MEDAL: QuizResultMedal = {
  medalImage: GoldMedal,
  name: "Gold Medal",
  title: "Congrats!",
  subTitleMessage: "It's official. You're a Multiplication Ninja!",
};
