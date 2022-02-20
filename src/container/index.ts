import { container } from "tsyringe"
import ChallengeRepositoryMock from "../gateway/ChallengeRepositoryMock";
import FormRepositoryMock from "../gateway/FormRepositoryMock";
import QuizImageProxyRepositoryMock from "../gateway/QuizImageProxyRepositoryMock";
import QuizPoolRepositoryMock from "../gateway/QuizPoolRepositoryMock";
import { CreateChallenge } from "../usecase/CreateChallenge";
import { CreateQuizPool } from "../usecase/CreateQuizPool";
import { RedeemChallengeResult } from "../usecase/RedeemChallengeResult";
import { RegisterForm } from "../usecase/RegisterForm";
import { ResolveQuizImageProxy } from "../usecase/ResolveQuizImageProxy";
import { SubmitChallenge } from "../usecase/SubmitChallenge";

container.registerSingleton("ChallengeRepository", ChallengeRepositoryMock);
container.registerSingleton("FormRepository", FormRepositoryMock);
container.registerSingleton("QuizImageProxyRepository", QuizImageProxyRepositoryMock);
container.registerSingleton("QuizPoolRepository", QuizPoolRepositoryMock);

container.register("ICreateChallenge", CreateChallenge);
container.register("ICreateQuizPool", CreateQuizPool);
container.register("IRedeemChallengeResult", RedeemChallengeResult);
container.register("IRegisterForm", RegisterForm);
container.register("IResolveQuizImageProxy", ResolveQuizImageProxy);
container.register("ISubmitChallenge", SubmitChallenge);

export default container;
