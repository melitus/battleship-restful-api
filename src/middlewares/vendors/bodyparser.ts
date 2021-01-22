import { Application } from "express";
import bodyParser from 'body-parser';

export const initBodyParser = (app: Application) => {
  app.use(bodyParser.json({ limit: '30kb' })); // parse body params and attach them to req.body
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '30kb',
    }),
  );
};

