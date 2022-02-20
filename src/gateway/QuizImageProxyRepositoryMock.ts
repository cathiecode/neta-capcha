import { singleton } from "tsyringe"
import QuizImageProxy from "../entity/QuizImageProxy";
import QuizImageProxyRepository from "../repository/QuizImageProxyRepository";
import RepositoryMock from "./RepositoryMock";

@singleton()
export default class QuizImageProxyRepositoryMock extends RepositoryMock<QuizImageProxy> implements QuizImageProxyRepository {}
