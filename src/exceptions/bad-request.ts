import httpStatus from 'http-status';

import { BattleshipBaseStackError } from './base-error';

export class BadRequestError extends BattleshipBaseStackError {
  constructor(status = httpStatus.BAD_REQUEST, title = 'Validation error', message = 'Bad Request') {
    super(message);
    this.status = status;
    this.title = title;
  }
}
