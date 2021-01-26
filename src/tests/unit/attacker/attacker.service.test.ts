/* eslint-disable @typescript-eslint/no-var-requires */
import chai, { expect } from 'chai';

import { connect, clearDatabase, closeDatabase } from '../../test-helper';
import AttackerService from '../../../api/v1/attacker/attacker.service';

chai.use(require('chai-as-promised'));

describe('AttackerService', () => {
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
  describe('AttackerService', () => {
    describe('attack', () => {
      it('should attack a specific coordinates on a board successfully', async () => {
        const record: any = {
          row: 4,
          colum: 6,
        };
        const attack: any = await AttackerService.attack(record);
        expect(attack._id).to.not.be.undefined;
        expect(attack.row).to.equal(record.row);
        expect(attack.column).to.equal(record.colum);
      });
    });
  });
});
