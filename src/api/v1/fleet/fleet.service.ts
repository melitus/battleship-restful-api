/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import FleetCollection from './fleet.entity';
import { IFleet } from './fleet.interface';
import { isGoodId, ID } from '../../../helpers';

// Load Fleet and append to req.
export const getSingleFleet = async (fleetId: ID): Promise<Partial<IFleet> | undefined> => {
  await isGoodId(fleetId);
  const foundFleet = await FleetCollection.findById(fleetId).lean<IFleet>().exec();
  return foundFleet;
};

const createFleet = async (fleetData: IFleet): Promise<IFleet> => {
  const newFleet = new FleetCollection(fleetData);
  const savedFleet = await newFleet.save();
  return savedFleet;
};

const updateFleet = async (fleetId: ID | any, fleetData: IFleet): Promise<IFleet> => {
  await isGoodId(fleetId);
  const selector = { _id: fleetId };
  const modifier = { $set: fleetData };
  const updatedFleet = await FleetCollection.updateOne(selector, modifier);
  return updatedFleet;
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
  getSingleFleet,
  createFleet,
  updateFleet,
  checkTypeExist,
};
