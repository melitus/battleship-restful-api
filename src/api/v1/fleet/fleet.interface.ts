import { Document, Types } from 'mongoose';
import { Request } from 'express';

export interface IFleet extends Document {
  _id: string | Types.ObjectId;
  status: string;
  direction: string;
  type: string;
  length: string;
  coordinate: boolean;
  aroundCoordinate: boolean;
  health: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface ICustomRequest extends Request {
  fleet: string;
}
