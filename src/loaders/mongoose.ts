import mongoose from 'mongoose';
import chalk from 'chalk';
import { Db } from 'mongodb';
import Promise = require('bluebird');

import config from '../config';
import getLogger from './logger';

const logger = getLogger.db;

// make bluebird default Promise
(<any>mongoose).Promise = Promise;

if (config.appKey.env === 'development') {
  mongoose.set('debug', true);
}

export const connectMongoWithRetry = async (): Promise<Db> => {
  const connectionString = config.mongo.uri;
  const connectionOptions = config.mongo.options;

  try {
    const connection = await mongoose.connect(connectionString, connectionOptions);
    logger.info(' 💻 Mongoose successfully connected to Jexta database: ');
    return connection.connection.db;
  } catch (error) {
    if (error.message.code === 'ETIMEDOUT') {
      logger.info('Attempting to re-establish database connection.');
      mongoose.connect(connectionString);
    } else {
      logger.error(
        chalk.bgRed.bold('Error while attempting to connect to database:', {
          error,
        }),
      );
    }
  }
};
