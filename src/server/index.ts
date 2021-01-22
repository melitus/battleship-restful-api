/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import http from 'http';
import express from 'express';
import { Application } from 'express';

import { appInitLoader } from '../loaders';
import config from '../config';
import getLogger from '../loaders/logger';

const logger = getLogger.initServer;

const app: Application = express();
const server = http.createServer(app);

export function startServer() {
  appInitLoader({ expressApp: app });
  server.listen(config.appKey.port, () =>
    logger.info(`👂 Battleship Api server started on port ${config.appKey.port} on (${config.appKey.env}) mode`),
  );
}

startServer();

export default app;
