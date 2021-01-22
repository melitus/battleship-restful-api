import { Application } from "express";

import { initMiddlewares } from '../middlewares';
import { initializeErrorHandling } from "./error";

export default async ({ app }: { app: Application }) => {
  // Redirect http url to https
  app.set("trust proxy", true);
  app.disable("x-powered-by");

  initMiddlewares(app);

  initializeErrorHandling(app);

  return app;
};
