/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { flatten } from 'lodash';

import { BadRequestError } from '../../../exceptions';

export const findCurrentPosition = (x: number, y: number, direction: string, length: number) => {
  const currentPosition: any = [];
  if ((direction === 'horizontally' && x + length > 10) || (direction === 'vertically' && y - length < 0))
    throw new BadRequestError(400, 'Ship placement does not allow!');
  if (direction === 'horizontally' && x + length <= 10 && length > 0) {
    for (let i = 0; i <= length; i++) {
      currentPosition.push({
        row: x + i,
        column: y,
      });
    }
  }
  if (direction === 'vertically' && y - length >= 0 && length > 0) {
    for (let i = 0; i <= length; i++) {
      currentPosition.push({
        row: x,
        column: y - 1,
      });
    }
  }
  if (length === 0) {
    currentPosition.push({
      x,
      y,
    });
  }
  return currentPosition;
};

export const findAroundPosition = (positions, direction, length) =>
  flatten(
    positions.map((position, index) => {
      if (length === 1) {
        return [
          {
            row: position.x - 1,
            column: position.y + 1,
          },
          {
            row: position.x - 1,
            column: position.y - 1,
          },
          {
            row: position.x - 1,
            column: position.y,
          },
          {
            row: position.x,
            column: position.y - 1,
          },
          {
            row: position.x,
            column: position.y + 1,
          },
          {
            row: position.x + 1,
            column: position.y + 1,
          },
          {
            row: position.x + 1,
            column: position.y - 1,
          },
          {
            row: position.x + 1,
            column: position.y,
          },
        ];
      }
      if (index === 0 && direction === 'horizontally') {
        return [
          {
            row: position.x - 1,
            column: position.y + 1,
          },
          {
            row: position.x - 1,
            column: position.y - 1,
          },
          {
            row: position.x - 1,
            column: position.y,
          },
          {
            row: position.x,
            column: position.y - 1,
          },
          {
            row: position.x,
            column: position.y + 1,
          },
        ];
      }
      if (index === positions.length - 1 && direction === 'horizontally') {
        return [
          {
            row: position.x + 1,
            column: position.y + 1,
          },
          {
            row: position.x + 1,
            column: position.y - 1,
          },
          {
            row: position.x + 1,
            column: position.y,
          },
          {
            row: position.x,
            column: position.y - 1,
          },
          {
            row: position.x,
            column: position.y + 1,
          },
        ];
      }
      if (direction === 'horizontally') {
        return [
          {
            row: position.x,
            column: position.y + 1,
          },
          {
            row: position.x,
            column: position.y - 1,
          },
        ];
      }
      if (index === 0 && direction === 'vertically') {
        return [
          {
            row: position.x - 1,
            column: position.y,
          },
          {
            row: position.x + 1,
            column: position.y,
          },
          {
            row: position.x,
            column: position.y + 1,
          },
          {
            row: position.x - 1,
            column: position.y + 1,
          },
          {
            row: position.x + 1,
            column: position.y + 1,
          },
        ];
      }
      if (index === positions.length - 1 && direction === 'vertically') {
        return [
          {
            row: position.x - 1,
            column: position.y,
          },
          {
            row: position.x + 1,
            column: position.y,
          },
          {
            row: position.x,
            column: position.y - 1,
          },
          {
            row: position.x - 1,
            column: position.y - 1,
          },
          {
            row: position.x + 1,
            column: position.y - 1,
          },
        ];
      }
      if (direction === 'vertically') {
        return [
          {
            row: position.x,
            column: position.y + 1,
          },
          {
            row: position.x,
            column: position.y - 1,
          },
        ];
      }
    }),
  );
