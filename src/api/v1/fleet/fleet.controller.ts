/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import httpStatus from 'http-status';
import { Request, Response } from 'express';

import FleetService from './fleet.service';

const createShip = async (req: Request, res: Response) => {
  const inputData = req.body;
  try {
    const typeExist = await FleetService.checkTypeExist(inputData.type);
    if (typeExist) {
      res.status(httpStatus.CONFLICT).json({ success: true, message: 'A ship already exist', data: typeExist });
    } else {
      const response = await FleetService.createShip(inputData);
      res.status(httpStatus.OK).json({ success: true, message: 'A ship is created successfully', data: response });
    }
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'Error occurred while creating a ship' });
  }
};

const placeAShipOnBoard = async (req: Request, res: Response) => {
  const inputData = req.body;
  try {
    const response = await FleetService.placeAShipOnBoard(inputData);
    res
      .status(httpStatus.OK)
      .json({ success: true, message: 'A ship is placed on a board successfully', data: response });
  } catch (error) {
    res
      .status(httpStatus.UNAUTHORIZED)
      .json({ success: false, message: 'Error occurred while placing a ship on a board' });
  }
};

export default {
  createShip,
  placeAShipOnBoard,
};
