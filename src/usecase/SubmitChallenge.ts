import { inject, injectable } from "tsyringe"
import ChallengeRepository from "../repository/ChallengeRepository"

type SubmitChallengeInput = {
  challengeId: string,
  answer: boolean[]
}

type SubmitChallengeOutput = {
  accepted: boolean,
  permitRetry?: boolean
}

export default interface ISubmitChallenge {
  handle(data: SubmitChallengeInput): Promise<SubmitChallengeOutput>;
}

@injectable()
export class SubmitChallenge {
  constructor(
    @inject("ChallengeRepository") private challengeRepository: ChallengeRepository
  ) {}

  async handle(data: SubmitChallengeInput): Promise<SubmitChallengeOutput> {
    const challenge = await this.challengeRepository.load(data.challengeId);

    if (challenge.tryCount >= 5) {
      return {
        accepted: false,
        permitRetry: false
      }
    }

    if (!challenge.challenge.isValidAnswer(data.answer)) {
      challenge.tryCount++;

      await this.challengeRepository.save(challenge);

      return {
        accepted: false,
        permitRetry: challenge.tryCount < 5
      }
    }

    challenge.cleared = true;
    await this.challengeRepository.save(challenge);
    return {
      accepted: true
    }
  }
}
