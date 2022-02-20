import { inject, injectable } from "tsyringe";
import ICreateChallenge from "../usecase/CreateChallenge";
import ICreateQuizPool from "../usecase/CreateQuizPool";
import IRedeemChallengeResult from "../usecase/RedeemChallengeResult";
import IRegisterForm from "../usecase/RegisterForm";
import IResolveQuizImageProxy from "../usecase/ResolveQuizImageProxy";
import ISubmitChallenge from "../usecase/SubmitChallenge";

// FIXME: Service locator?
@injectable()
export default class QuizController {
  constructor(
    @inject("ICreateChallenge") public createChallenge: ICreateChallenge,
    @inject("ICreateQuizPool") public createQuizPool: ICreateQuizPool,
    @inject("IRedeemChallengeResult") public redeemChallengeResult: IRedeemChallengeResult,
    @inject("IRegisterForm") public registerForm: IRegisterForm,
    @inject("IResolveQuizImageProxy") public resolveQuizImageProxy: IResolveQuizImageProxy,
    @inject("ISubmitChallnege") public submitChallenge: ISubmitChallenge
  ) {

  }
}
