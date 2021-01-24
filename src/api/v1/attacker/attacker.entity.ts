import { Schema, Model, model } from 'mongoose';

import { IAttacker } from './attacker.interface';

const COLLECTION = 'Attacker';
const states = ['setup', 'playing'];

const attackerSchema = new Schema(
  {
    status: { type: String, enum: states, unique: true },
    attackCount: { type: Number, default: 0 },
    limit: { type: Number, default: 35 },
    miss: { type: Number, default: 0 },
    hit: { type: Number, default: 0 },
    attackCoordinate: [
      {
        row: Number,
        column: Number,
      },
    ],
  },
  { timestamps: true },
);

const attackerModel: Model<IAttacker> = model<IAttacker>(COLLECTION, attackerSchema);
export default attackerModel;
