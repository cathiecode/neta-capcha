import { singleton } from "tsyringe"
import QuizPool from "../entity/QuizPool";
import IQuizPoolRepository from "../repository/QuizPoolRepository";

@singleton()
export default class QuizPoolRepositoryMock implements IQuizPoolRepository {
  memory: {[id: string]: QuizPool} = {};

  async save(quizPool: QuizPool): Promise<void> {
    this.memory[quizPool.id] = quizPool;
  }
  async load(id: string): Promise<QuizPool> {
    const result = this.memory[id];
    if (!result) {
      throw new Error("No such QuizPool.")
    }
    return result;
  }
}
