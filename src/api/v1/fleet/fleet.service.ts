/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import FleetCollection from './fleet.entity';
import { IFleet } from './fleet.interface';
import { isGoodId, ID } from '../../../helpers';
import config from '../../../config';
import { BadRequestError } from '../../../exceptions';
import { findAroundPosition, findCurrentPosition } from './fleet.helper';

// Load Fleet and append to req.
export const getSingleShip = async (shipId: ID): Promise<Partial<IFleet> | undefined> => {
  await isGoodId(shipId);
  const foundShip = await FleetCollection.findById(shipId).lean<IFleet>().exec();
  return foundShip;
};

const getShips = async ({ status, type }) => {
  const searchQuery = { status, type };
  const foundFleets = await FleetCollection.find(searchQuery);
  return foundFleets;
};

const createShip = async (fleetData: IFleet): Promise<IFleet> => {
  const newFleet = new FleetCollection(fleetData);
  const savedFleet = await newFleet.save();
  return savedFleet;
};

const placeAShipOnBoard = async (inputData: any): Promise<Partial<IFleet>> => {
  const { row, column, type, direction } = inputData;
  const getConfig = config.fleetConfig[type];
  if (!getConfig) {
    throw new BadRequestError(400, 'Wrong type.');
  }
  const ship = await getShips({ status: 'AVAILABLE', type });
  const currentPositions = findCurrentPosition(row, column, direction, getConfig.length - 1);
  const aroundPositions = findAroundPosition(currentPositions, direction, getConfig.length);
  Promise.all([
    await isOverlap(currentPositions, aroundPositions),
    await placedShipInBattleField(currentPositions, aroundPositions, direction, type, ship),
  ]);
  const response = {
    type,
    status: 'active',
  };

  return response;
};

const placedShipInBattleField = async (currentPositions, aroundPositions, direction, type, ship) => {
  const selector = { _id: ship._id, type, status: 'AVAILABLE' };
  const fleetPayload = {
    status: 'ACTIVE',
    coordinate: currentPositions,
    direction,
    aroundCoordinate: aroundPositions,
    health: ship['length'],
  };
  const modifier = { $set: fleetPayload };
  const placedShip = await FleetCollection.updateOne(selector, modifier);
  return placedShip;
};

const isOverlap = async (currentPositions, aroundPositions) => {
  const checkArea = [...currentPositions, ...aroundPositions];
  const checkPositionOverlap = (
    await Promise.all(
      checkArea.map(async (position) => {
        const data = (await FleetCollection.find({ 'coordinate.x': position.x, 'coordinate.y': position.y })).data;
        return data;
      }),
    )
  ).filter((val) => val.length > 0);
  if (checkPositionOverlap.length) throw new BadRequestError(400, 'Ship placement illegal!');
  return true;
};

const checkTypeExist = async (name: string) => {
  const foundShipType = await FleetCollection.findOne({ type: name });
  let response;
  if (foundShipType) {
    response = true;
  } else {
    response = false;
  }
  return response;
};

export default {
  getSingleShip,
  createShip,
  placeAShipOnBoard,
  checkTypeExist,
};
