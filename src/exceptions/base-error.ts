export class BattleshipBaseStackError extends Error {
  errors: Error;
  status: number;
  httpCode: number;
  message: string;
  isPublic: boolean;
  isOperational: boolean;
  title: string;
  constructor(message: string, ...args: any) {
    super(...args);
    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = this.httpCode;
    this.name = this.constructor.name;
    this.message = message;
    this.isPublic = this.isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = this.stack; // Error.captureStackTrace(this, this.constructor.name);
    this.title = this.title;
    Error.captureStackTrace(this);
  }
}
