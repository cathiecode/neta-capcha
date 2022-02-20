import Express, { NextFunction, Request, Response, Router } from "express";
import { version } from "../../../package.json";

import container from "../../container";
import QuizController from "../../controller/quiz";

const quiz = container.resolve(QuizController);

const router = Router();

router.use(Express.json());

router.get("/", (_: Request, res: Response) => {
  res.send(version);
});

router.post("/quiz-pool", async (req: Request, res: Response) => {
  const result = await quiz.createQuizPool.handle(req.body);

  res.send({
    quizPoolId: result.quizPoolId
  });
});

router.post("/form", async (req: Request, res: Response) => {
  const result = await quiz.registerForm.handle({quizPoolId: req.body["quizPoolId"]});

  res.send({
    formId: result.formId
  });
});

router.post("/challenge", async (req: Request, res: Response) => {
  if (!req.body["formId"]) {
    res.status(400);
    res.send({
      error: "Please specify form id"
    });
    return;
  }
  const result = await quiz.createChallenge.handle({formId: req.body["formId"]});

  res.send(result);
});

router.post("/challenge/:challengeId/answer", async (req: Request, res: Response) => {
  if (!req.params["challengeId"]) {
    res.status(400);
    res.send("Please specify challenge id");
    return;
  }
  const result = await quiz.submitChallenge.handle({challengeId: req.params["challengeId"], answer: req.body});

  res.send(result);
});

router.get("/challenge/:challengeId", async (req: Request, res: Response) => {
  if (!req.params["challengeId"]) {
    res.status(400);
    res.send("Please specify challenge id");
    return;
  }

  if (!req.params["formId"]) {
    res.status(400);
    res.send("Please specify form id");
    return;
  }

  const result = await quiz.redeemChallengeResult.handle({
    challengeId: req.params["challengeId"],
    formId: req.params["formId"]
  });

  res.send(result);
});

router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error("--- APIv1 ERROR ---");
  console.error(error);
  console.trace(error);

  res.status(500);

  res.send({error: "Internal server error"});
});

export default router;
