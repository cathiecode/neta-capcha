import Express from "express"
import { Request, Response, NextFunction } from "express";

import api from "./api";

const app = Express();

app.use("api", api);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error("--- ERROR ---");
  console.error(error);
  console.trace(error);

  res.status(500);

  res.send();
})
