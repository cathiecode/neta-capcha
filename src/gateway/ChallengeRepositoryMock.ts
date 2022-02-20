
import { singleton } from "tsyringe"
import { Challenge } from "../entity/Challenge";
import ChallengeRepository from "../repository/ChallengeRepository";

@singleton()
export default class ChallengeRepositoryMock implements ChallengeRepository {
  memory: {[id: string]: Challenge} = {};

  async save(challenge: Challenge): Promise<void> {
    this.memory[challenge.challenge.id] = challenge;
  }
  async load(id: string): Promise<Challenge> {
    return this.memory[id] ?? (() => {throw new Error("No such item.")})();
  }
}
