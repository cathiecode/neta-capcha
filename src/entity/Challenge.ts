import ChooseQuizChallenge from "./ChooseQuizChallenge";
import RegionalQuizChallenge from "./RegionalQuizChallenge";

export type Challenge = {
  formId: string,
  cleared: boolean,
  redeemed: boolean,
  tryCount: number,
} & ({
  type: "choose",
  challenge: ChooseQuizChallenge
} | {
  type: "regional",
  challenge: RegionalQuizChallenge
})
