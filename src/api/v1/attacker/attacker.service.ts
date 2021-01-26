/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import FleetService from '../fleet/fleet.service';
import AttackerCollection from './attacker.entity';
import { BadRequestError, UnauthorizedError } from '../../../exceptions';
import { IAttacker } from './attacker.interface';

export const attack = async ({ x, y }) => {
  await isPlacedAllShip();
  const checkGameOver = await isGameOver();
  if (checkGameOver) {
    return checkGameOver;
  }
  await isAttacked({ x, y });
  return await attackShip({ x, y });
};

const isPlacedAllShip = async () => {
  const fleets = await FleetService.getAllShipAvailable;
  if (fleets.length > 0) throw new UnauthorizedError(401, 'Needs to place all ships before start attacking');
};

const attackShip = async ({ x, y }) => {
  let health, message;
  const foundAttacker = AttackerCollection.findOne({}).lean<IAttacker>().exec();
  let { miss, hit, limit }: any = foundAttacker;
  const foundFleet = await FleetService.findAShipByCoordinate(x, y);
  foundFleet && foundFleet.toObject();
  if (foundFleet) {
    health = foundFleet.health - 1;
    hit += 1;
    await FleetService.updateShipHealth(foundFleet._id, { health });
    await AttackerCollection.updateOne(
      {},
      { $push: { attackCoordinate: { row: x, column: y } }, status: 'playing', $inc: { attackCount: 1, hit: 1 } },
    );
    message = health === 0 ? `You just sank the ${foundFleet.type}` : 'HIT!';
  } else {
    miss += 1;
    message = 'MISS!';
    await AttackerCollection.updateOne(
      {},
      { $push: { attackCoordinate: { row: x, column: y } }, status: 'playing', $inc: { attackCount: 1, miss: 1 } },
    );
  }
  return {
    message,
    hit,
    missedShots: miss,
    attackCount: hit + miss,
    numberOfRequiredShots: limit,
  };
};

const isAttacked = async ({ x, y }) => {
  if (await AttackerCollection.findOne({ 'attackCoordinate.row': x, 'attackCoordinate.column': y })) {
    throw new BadRequestError(401, 'This coordinate was attacked');
  }
  return true;
};

const isGameOver = async () => {
  let foundAttacker = await AttackerCollection.findOne({}).lean<IAttacker>().exec();
  console.log({ foundAttacker });
  const { attackCount, miss, hit, limit }: IAttacker = foundAttacker;
  if (attackCount >= limit) {
    return {
      message: 'GAME OVER',
      hit,
      missedShots: miss,
      attackCount,
      numberOfRequiredShots: limit,
    };
  }
};

export default {
  attack,
};
