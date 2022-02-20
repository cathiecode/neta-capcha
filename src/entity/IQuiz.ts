import { Challenge } from "./Challenge";

export default interface IQuiz {
  createChallenge(formId: string): Challenge // 本当にこれでいい？
}
