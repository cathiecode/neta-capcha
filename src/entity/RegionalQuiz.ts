import uniqid from "uniqid"
import { Challenge } from "./Challenge";
import IQuiz from "./IQuiz"
import QuizImageProxy from "./QuizImageProxy"
import RegionalQuizChallenge from "./RegionalQuizChallenge"

export default class RegionalQuiz implements IQuiz {
  constructor(
    public id: string,
    public imageId: string,
    public question: string,
    public answer: boolean[],
    public size: [number, number]
  ) {}

  createChallenge(formId: string): Challenge {
    return {
      type: "regional",
      challenge: new RegionalQuizChallenge(uniqid(), new QuizImageProxy(uniqid(), this.imageId), this.question, this.answer),
      cleared: false,
      redeemed: false,
      formId: formId,
      tryCount: 0
    };
  }
}
