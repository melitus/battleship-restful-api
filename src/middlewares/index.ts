import { initCors } from './vendors/cors';
import { initBodyParser } from './vendors/bodyparser';

export const initMiddlewares = (app) => {
  initCors(app);
  initBodyParser(app);
};
