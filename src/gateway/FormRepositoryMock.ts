import { singleton } from "tsyringe"
import Form from "../entity/Form";
import FormRepository from "../repository/FormRepository";
import RepositoryMock from "./RepositoryMock";


@singleton()
class FormRepositoryMock extends RepositoryMock<Form> implements FormRepository {
  constructor() {
    super();
    console.log("construct!");
  }
}

export default FormRepositoryMock
