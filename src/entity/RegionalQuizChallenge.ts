import IChallenge from "./IChallenge";
import QuizImageProxy from "./QuizImageProxy";


export default class RegionalQuizChallenge implements IChallenge {
  id: string
  image: QuizImageProxy
  question: string
  validAnswer: boolean[]

  constructor(id: string, image: QuizImageProxy, question: string, validAnswer: boolean[]) {
    this.id = id;
    this.image = image;
    this.question = question;
    this.validAnswer = validAnswer;
  }

  isValidAnswer(answer: boolean[]): boolean {
    return answer.every((answerComponent, index) => this.validAnswer[index] === answerComponent);
  }
}
