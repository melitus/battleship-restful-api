import * as express from "express";

export default async ({ app }: { app: express.Application }) => {
  // Redirect http url to https
  app.set("trust proxy", true);
  app.disable("x-powered-by");

  return app;
};
