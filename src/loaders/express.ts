/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Application } from 'express';

import { initMiddlewares } from '../middlewares';
import { initializeErrorHandling } from './error';
import installApiEndpoints from '../api/routes';

export default async ({ app }: { app: Application }) => {
  // Redirect http url to https
  app.set('trust proxy', true);
  app.disable('x-powered-by');

  initMiddlewares(app);

  app.use('/v1/api', installApiEndpoints);
  initializeErrorHandling(app);

  return app;
};
