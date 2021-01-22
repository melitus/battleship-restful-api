import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

import {formatError} from './format-error'
import {BattleshipBaseStackError} from './base-error'


/** Class representing an API Error Response with a related HTTP Status Code **/
export class APIError extends BattleshipBaseStackError {
  /**
   * Create an Error Object
   * @param {number} status - The HTTP Status Code (e.g. 404)
   * @param {string} title - The title corresponding to the Status Code (e.g. Bad Request)
   * @param {string} message - Specific information about what caused the error
   */
  constructor(
    status = httpStatus.INTERNAL_SERVER_ERROR,
    title = 'Internal Server Error',
    message = 'An unknown server error occurred.',
  ) {
    // super(status, title, message);
    super(message);
    this.status = status;
    this.title = title;
  }
}


function isTrustedError(error: Error) {
  if (error instanceof BattleshipBaseStackError) {
    return error.isOperational;
  }
  return false;
}

// error handling middleware
export async function errorHandler(error: BattleshipBaseStackError, request: Request, response: Response, next: NextFunction) {
  let err = error;

  /* if we get an unhandled error, we want to log to console and turn it into an API error */
  if (!isTrustedError(err)) {
    err = new APIError(
      httpStatus.INTERNAL_SERVER_ERROR,
      error.name || 'Internal Server Error',
      error.message || 'An unknown server error occurred',
    );
  }
  const processedErrors = formatError(err);
  response.status(processedErrors.errors[0].status || 500).json(processedErrors);
  return next();
}


