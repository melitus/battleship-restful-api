/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import FleetCollection from './fleet.entity';
import { IFleet } from './fleet.interface';
import config from '../../../config';
import { BadRequestError } from '../../../exceptions';
import { findAroundPosition, findCurrentPosition } from './fleet.helper';

const getShips = async ({ status, type }): Promise<Partial<IFleet>> => {
  const searchQuery = { status, type };
  const foundFleets = await FleetCollection.find(searchQuery).lean<IFleet>().exec();
  return foundFleets;
};
const getAllShipAvailable = async () => {
  const searchQuery = { status: 'available' };
  const foundShips = await FleetCollection.find(searchQuery);
  return foundShips;
};
const findAShipByCoordinate = async (x: number, y: number) => {
  const foundFleet = await FleetCollection.findOne({ 'coordinate.row': x, 'coordinate.column': y });
  return foundFleet;
};
const updateShipHealth = async (shipId, inputData) => {
  const updated = await FleetCollection.updateOne({ _id: shipId }, { inputData });
  return updated;
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
  const ship = await getShips({ status: 'available', type });
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
    status: 'active',
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
        const data = await FleetCollection.find({
          'coordinate.row': position.row,
          'coordinate.column': position.column,
        });
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
  createShip,
  placeAShipOnBoard,
  checkTypeExist,
  getAllShipAvailable,
  findAShipByCoordinate,
  updateShipHealth,
};
