/* eslint-disable @typescript-eslint/no-var-requires */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import { ObjectID } from 'mongodb';

import { connect, clearDatabase, closeDatabase } from './db-handler';
import FleetService from '../api/v1/fleet/fleet.service';

chai.use(require('chai-as-promised'));

describe('FleetService', () => {
  //Connect to a new in-memory database before running any tests.
  before(async () => {
    await connect();
  });

  //Clear all test data after every test.
  afterEach(async () => {
    await clearDatabase();
  });

  //Remove and close the db and server.
  after(async () => {
    await closeDatabase();
  });

  describe('createShip', () => {
    it('should not create a ship if record already exists', async () => {
      try {
        const record: any = {
          status: 'active',
          direction: 'setup',
          type: 'Submarine',
          length: 1,
          health: 1,
          coordinate: [],
          aroundCoordinate: [],
        };

        await FleetService.createShip(record);
      } catch (e) {
        expect(e.message).to.equal('record already exists');
      }
    });

    it('should create a new ship successfully', async () => {
      const newShip: any = {
        status: 'active',
        direction: 'setup',
        type: 'Submarine',
        length: 1,
        health: 1,
        coordinate: [],
        aroundCoordinate: [],
      };

      const ship = await FleetService.createShip(newShip);
      expect(ship._id).to.not.be.undefined;
      expect(ship.status).to.equal(newShip.status);
      expect(ship.direction).to.equal(newShip.direction);
      expect(ship.type).to.equal(newShip.type);
      expect(ship.length).to.equal(newShip.length);
      expect(ship.health).to.equal(newShip.health);
    });
  });
});
