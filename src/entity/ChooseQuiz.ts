import uniqid from "uniqid"

import IQuiz from "./IQuiz"
import { Challenge } from "./Challenge"
import ChooseQuizChallenge from "./ChooseQuizChallenge"
import pickRandomly from "../utils/pickRandomly"
import QuizImageProxy from "./QuizImageProxy"

export default class ChooseQuiz implements IQuiz {
  constructor(
    public id: string,
    public images: {imageId: string, isValid: boolean}[],
    public question: string
  ) {}

  createChallenge(formId: string): Challenge {
    const images = pickRandomly(this.images, 9).map(({imageId, isValid}) => {
      return {
        image: new QuizImageProxy(uniqid(), imageId),
        isValid: isValid
      }
    })
    return {
      type: "choose",
      challenge: new ChooseQuizChallenge(uniqid(), this.question, images),
      cleared: false,
      redeemed: false,
      formId: formId,
      tryCount: 0
    }
  }
}
