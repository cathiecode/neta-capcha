import IChallenge from "./IChallenge";
import QuizImageProxy from "./QuizImageProxy";

export default class ChooseQuizChallenge implements IChallenge {
  id: string
  question: string
  images: {image: QuizImageProxy, isValid: boolean}[]

  constructor(id: string, question: string, images: {image: QuizImageProxy, isValid: boolean}[]) {
    this.id = id;
    this.question = question;
    this.images = images;
  }

  isValidAnswer(answer: boolean[]): boolean {
    return answer.every((answerComponent, index) => this.images[index]?.isValid === answerComponent);
  }
}
