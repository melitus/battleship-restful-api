import { Document, Types } from 'mongoose';
import { Request } from 'express';

export interface IAttacker extends Document {
  _id: string | Types.ObjectId;
  status: string;
  attackCount: number;
  limit: number;
  miss: number;
  hit: number;
  attackCoordinate: string;
  updatedAt?: Date;
  createdAt?: Date;
}
