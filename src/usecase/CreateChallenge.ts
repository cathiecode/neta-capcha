import { inject, injectable } from "tsyringe";
import ChallengeRepository from "../repository/ChallengeRepository";
import FormRepository from "../repository/FormRepository";
import QuizImageProxyRepository from "../repository/QuizImageProxyRepository";
import QuizPoolRepository from "../repository/QuizPoolRepository";

type CreateChallengeInputData = {
  formId: string
}; // Form id

type CreateChallengeOutputData = {
  id: string
} & ({
  type: "regional",
  question: string,
  imageProxyId: string  
} | {
  type: "choose",
  question: string,
  imageProxyIds: string[],
});

export default interface ICreateChallenge {
  handle(data: CreateChallengeInputData): Promise<CreateChallengeOutputData>;
}

@injectable()
export class CreateChallenge implements ICreateChallenge {
  constructor(
    @inject("FormRepository") private formRepository: FormRepository,
    @inject("QuizPoolRepository") private quizPoolRepository: QuizPoolRepository,
    @inject("ChallengeRepository") private challengeRepository: ChallengeRepository,
    @inject("QuizImageProxyRepository") private quizImageProxyRepository: QuizImageProxyRepository
  ) {}

  async handle(data: CreateChallengeInputData): Promise<CreateChallengeOutputData> {
    const form = await this.formRepository.load(data.formId);

    const quizPool = await this.quizPoolRepository.load(form.quizPoolId); // TODO: errorのときに代替quizを返す

    // TODO: BAN

    const challenge = quizPool.createChallenge(data.formId);

    // TODO: それぞれのタイプでUsecaseをわける
    let output: CreateChallengeOutputData;
    switch (challenge.type) {
      case "choose":
        output = {
          id: challenge.challenge.id,
          type: "choose",
          question: challenge.challenge.question,
          imageProxyIds: challenge.challenge.images.map(image => image.image.id)
        }
        await Promise.all(
          challenge.challenge.images
            .map(image => image.image)
            .map((imageProxy) => this.quizImageProxyRepository.save(imageProxy))
          );
        break;
      case "regional":
        output = {
          id: challenge.challenge.id,
          type: "regional",
          question: challenge.challenge.question,
          imageProxyId: challenge.challenge.image.id
        }
        await this.quizImageProxyRepository.save(challenge.challenge.image);
    }

    await this.challengeRepository.save(challenge);

    return output;
  }
}
