import { inject, injectable } from "tsyringe"
import ChallengeRepository from "../repository/ChallengeRepository"

type RedeemChallengeResultInput = {
  formId: string,
  challengeId: string
}

type RedeemChallengeResultOutput = {
  cleared: boolean
}

export default interface IRedeemChallengeResult {
  handle(data: RedeemChallengeResultInput): Promise<RedeemChallengeResultOutput>
}

@injectable()
export class RedeemChallengeResult {
  constructor(
    @inject("ChallengeRepository") private challengeRepository: ChallengeRepository
  ) {}

  async handle(data: RedeemChallengeResultInput): Promise<RedeemChallengeResultOutput> {
    const challenge = await this.challengeRepository.load(data.challengeId);

    if (!challenge.cleared || challenge.redeemed || challenge.formId !== data.formId) {
      return {
        cleared: false
      }
    }

    challenge.redeemed = true;

    await this.challengeRepository.save(challenge);

    return {
      cleared: true
    }
  }
}
