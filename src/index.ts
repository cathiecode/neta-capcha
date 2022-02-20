import "reflect-metadata"

import container from "./container";

import { CreateQuizPool } from "./usecase/CreateQuizPool";
import { RegisterForm } from "./usecase/RegisterForm";
import { CreateChallenge } from "./usecase/CreateChallenge";
import { SubmitChallenge } from "./usecase/SubmitChallenge";
import { ResolveQuizImageProxy } from "./usecase/ResolveQuizImageProxy";

(async () => {
  const createQuizPool = container.resolve(CreateQuizPool);

  const createQuizPoolResult = await createQuizPool.handle({
    title: "ゲヘナ",
    description: "ゲヘナを選ぶやつ",
    chooseQuiz: [
      {
        question: "ゲヘナ学園の生徒を選んでください",
        images: [
          {
            imageId: "アル",
            isValid: true
          },
          {
            imageId: "ヒナ",
            isValid: true
          },
          {
            imageId: "イオリ",
            isValid: true
          },
          {
            imageId: "チナツ",
            isValid: true
          },
          {
            imageId: "アコ",
            isValid: true
          },
          {
            imageId: "ムツキ",
            isValid: true
          },
          {
            imageId: "ハルカ",
            isValid: true
          },
          {
            imageId: "ハルナ",
            isValid: true
          },
          {
            imageId: "ジュンコ",
            isValid: true
          },
          {
            imageId: "フウカ",
            isValid: true
          },
          {
            imageId: "ツルギ",
            isValid: true
          },
          {
            imageId: "マシロ",
            isValid: true
          },
          {
            imageId: "ハスミ",
            isValid: true
          },
          {
            imageId: "アズサ",
            isValid: true
          },
          {
            imageId: "カリン",
            isValid: true
          },
          {
            imageId: "ヒビキ",
            isValid: true
          }
        ]
      },
    ],
    regionalQuiz: [],
  });

  const registerForm = container.resolve(RegisterForm);

  const registerFormResult = await registerForm.handle({quizPoolId: createQuizPoolResult.quizPoolId});

  const createChallenge = container.resolve(CreateChallenge);

  const createChallengeResult = await createChallenge.handle({formId: registerFormResult.formId});

  console.log(createChallengeResult.question);

  const resolveImageProxy = container.resolve(ResolveQuizImageProxy);

  let answer: boolean[] = [];
  switch(createChallengeResult.type) {
    case "choose":
      answer = await Promise.all(createChallengeResult.imageProxyIds.map(async imageProxyId => !((await resolveImageProxy.handle({quizImageProxyId: imageProxyId})).imageId in ["ツルギ", "マシロ", "ハスミ", "アズサ", "カリン", "ヒビキ"])))
      break;
    case "regional":
      break;
  }

  const submitChallenge = container.resolve(SubmitChallenge);

  const submitChallengeResult = await submitChallenge.handle({challengeId: createChallengeResult.id, answer: answer});

  console.log(submitChallengeResult);

})().then(console.log)
