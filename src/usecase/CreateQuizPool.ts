import { inject, injectable } from "tsyringe";
import uniqid from "uniqid";
import ChooseQuiz from "../entity/ChooseQuiz";

import QuizPool from "../entity/QuizPool";
import RegionalQuiz from "../entity/RegionalQuiz";
import QuizPoolRepository from "../repository/QuizPoolRepository";

type CreateQuizPoolInputData = {
  title: string
  description: string
  chooseQuiz: {
    question: string,
    images: {
      imageId: string,
      isValid: boolean
    }[]
  }[],
  regionalQuiz: {
    imageId: string,
    question: string,
    answer: boolean[],
    size: [number, number]
  }[]
}

type CreateQuizPoolOutputData = {
  quizPoolId: string
};

export default interface ICreateQuizPool {
  handle(data: CreateQuizPoolInputData): Promise<CreateQuizPoolOutputData>;
}

@injectable()
export class CreateQuizPool implements ICreateQuizPool {
  constructor(
    @inject("QuizPoolRepository") private quizPoolRepository: QuizPoolRepository,
  ) {}

  async handle(data: CreateQuizPoolInputData): Promise<CreateQuizPoolOutputData> {
    const chooseQuiz = data.chooseQuiz.map(chooseQuiz => new ChooseQuiz(uniqid(), chooseQuiz.images, chooseQuiz.question));
    const regionalQuiz = data.regionalQuiz.map(regionalQuiz => new RegionalQuiz(uniqid(), regionalQuiz.imageId, regionalQuiz.question, regionalQuiz.answer, regionalQuiz.size));
    const quizPool = new QuizPool(uniqid(), data.title, data.description, chooseQuiz, regionalQuiz);

    await this.quizPoolRepository.save(quizPool);

    return {
      quizPoolId: quizPool.id
    }
  }
}
