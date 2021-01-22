import path from 'path';
import * as dotenv from 'dotenv';

const envPath = path.join(
  process.cwd(),
  `.env${!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '' : `.${process.env.NODE_ENV}`}`,
);

const loadenv = () =>
  dotenv.config({
    path: envPath,
  });

loadenv();

export default {
  appKey: {
    port: process.env.APP_PORT || 8000,
    env: process.env.NODE_ENV || 'production',
  },
  mongo: {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
  },
};
