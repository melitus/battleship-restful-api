import { Document, Types } from 'mongoose';

export interface IAttacker extends Document {
  _id: string | Types.ObjectId;
  status: string;
  attackCount: number;
  limit: number;
  miss: number;
  hit: number;
  attackCoordinate: [coordinates];
  updatedAt?: Date;
  createdAt?: Date;
}

type coordinates = {
  row: number;
  column: number;
};
