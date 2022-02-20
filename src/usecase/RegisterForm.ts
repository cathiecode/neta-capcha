import { inject, injectable } from "tsyringe"
import uniqid from "uniqid";
import Form from "../entity/Form";
import FormRepository from "../repository/FormRepository"

type RegisterFormInputData = {
  quizPoolId: string
}

type RegisterFormOutputData = {
  formId: string
}

export default interface IRegisterForm {
  handle(data: RegisterFormInputData): Promise<RegisterFormOutputData>;
}

@injectable()
export class RegisterForm implements IRegisterForm {
  constructor(
    @inject("FormRepository") private formRepository: FormRepository
  ) {}

  async handle(data: RegisterFormInputData): Promise<RegisterFormOutputData> {
    const form = new Form(uniqid(), data.quizPoolId);

    await this.formRepository.save(form);

    return {
      formId: form.id
    };
  }
}
