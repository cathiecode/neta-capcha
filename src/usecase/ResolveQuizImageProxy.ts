import { inject, injectable } from "tsyringe"
import QuizImageProxyRepository from "../repository/QuizImageProxyRepository"

type ResolveQuizImageProxyInput = {
  quizImageProxyId: string
}

type ResolveQuizImageProxyOutput = {
  imageId: string
}

export default interface IResolveQuizImageProxy {
  handle(data: ResolveQuizImageProxyInput): Promise<ResolveQuizImageProxyOutput>;
}

@injectable()
export class ResolveQuizImageProxy {
  constructor(
    @inject("QuizImageProxyRepository") private quizImageProxyRepository: QuizImageProxyRepository
  ) {}
  async handle(data: ResolveQuizImageProxyInput): Promise<ResolveQuizImageProxyOutput> {
    const result = await this.quizImageProxyRepository.load(data.quizImageProxyId);

    return {
      imageId: result.originalImageId
    }
  }
}
