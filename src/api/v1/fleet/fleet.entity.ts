import { Schema, Model, model } from 'mongoose';

import { IFleet } from './fleet.interface';

const COLLECTION = 'Fleet';
const states = ['available', 'active'];
const directions = ['vertically', 'horizontally', 'setup'];
const shipTypes = ['Carrier', 'Battleship', 'Cruisers', 'Submarines', 'Destroyers', 'None'];

const fleetSchema = new Schema(
  {
    status: { type: String, enum: states, unique: true },
    direction: { type: String, enum: directions, unique: true },
    type: { type: String, enum: shipTypes, default: 'Node', unique: true },
    length: { type: Number },
    health: { type: Number },
    coordinate: [
      {
        row: Number,
        column: Number,
      },
    ],
    aroundCoordinate: [
      {
        row: Number,
        column: Number,
      },
    ],
  },
  { timestamps: true },
);

const fleetModel: Model<IFleet> = model<IFleet>(COLLECTION, fleetSchema);
export default fleetModel;
