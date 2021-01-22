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
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      keepAlive: 120,
      useFindAndModify: false,
      useUnifiedTopology: true,
      autoIndex: false, // Don't build indexes
      poolSize: 50, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    },
  },
};
