import pickRandomly from "../utils/pickRandomly";
import { Challenge } from "./Challenge";
import ChooseQuiz from "./ChooseQuiz";
import RegionalQuiz from "./RegionalQuiz";

export default class QuizPool {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public chooseQuiz: ChooseQuiz[],
    public regionalQuiz: RegionalQuiz[]
  ) {}

  pickQuiz(): ChooseQuiz | RegionalQuiz {
    const quizPool = [...this.chooseQuiz, ...this.regionalQuiz];
    const quiz = pickRandomly(quizPool, 1)[0];

    if (quiz === undefined) {
      throw new Error("Logic error.");
    }

    return quiz;
  }

  createChallenge(formId: string): Challenge {
    return this.pickQuiz().createChallenge(formId);
  }
}
