/* eslint-disable @typescript-eslint/no-var-requires */
import chai, { expect } from 'chai';

import { connect, clearDatabase, closeDatabase } from '../../test-helper';
import FleetService from '../../../api/v1/fleet/fleet.service';

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
  describe('FleetService', () => {
    describe('createShip', () => {
      it('should not create a ship if record already exists', async () => {
        try {
          const record: any = {
            status: 'active',
            direction: 'setup',
            type: 'Submarines',
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
          type: 'Submarines',
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
    describe('placeAShipOnBoard', () => {
      it('should place a ship', async () => {
        const inputData = { row: 1, column: 1, type: 'Submarines', direction: 'vertically' };
        const update = await FleetService.placeAShipOnBoard(inputData);
        expect(update.status).to.equal('active');
        expect(update.type).to.equal(inputData.type);
      });
    });
  });
});
