/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Types } from 'mongoose';

export function isGoodId(value: string | number) {
  if (!value) {
    // obviously
    return false;
  }
  if (typeof value === 'object' && Types.ObjectId.isValid(value)) {
    return true;
  }
  if (typeof value === 'string' && /^[a-fA-F0-9]{24}$/.test(value) && Types.ObjectId.isValid(value)) {
    return true;
  }

  return false;
}

/**
 * @description
 * An entity ID. Depending on the configured {@link EntityIdStrategy}, it will be either
 * a `string` or a `number`;
 *
 * @docsCategory common
 */
export type ID = string | number;
