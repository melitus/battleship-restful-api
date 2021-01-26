/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import httpStatus from 'http-status';
import { Request, Response } from 'express';

import AttackerService from './attacker.service';

const attack = async (req: Request, res: Response) => {
  const inputData = req.body;
  try {
    const response = await AttackerService.attack(inputData);
    res.status(httpStatus.OK).json({ success: true, message: 'An attacker attacks successfully', data: response });
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'Error occurred while attacking' });
  }
};

export default {
  attack,
};
