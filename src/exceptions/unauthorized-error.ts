import httpStatus from 'http-status';

import { BattleshipBaseStackError } from './base-error';

export class UnauthorizedError extends BattleshipBaseStackError {
  constructor(status = httpStatus.UNAUTHORIZED, title = 'UnauthorizedError', message = 'Unauthorized Error') {
    super(message);
    this.status = status;
    this.title = title;
  }
}
