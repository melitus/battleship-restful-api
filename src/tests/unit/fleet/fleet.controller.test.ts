// /* eslint-disable @typescript-eslint/no-var-requires */
// import chai, { expect } from 'chai';
// import sinon from 'sinon';
// import faker from 'faker';
// import { Request } from 'express';
// import sinonChai from 'sinon-chai';

// import FleetController from '../../../api/v1/fleet/fleet.controller';
// import FleetService from '../../../api/v1/fleet/fleet.service';

// chai.use(require('chai-as-promised'));
// chai.use(sinonChai);

// const mockResponse = () => {
//   const res: any = {};
//   res.status = sinon.stub();
//   res.json = sinon.stub();
//   res.status.returns(res);
//   return res;
// };

// describe('FleetController', () => {
//   let sandbox;
//   let res;
//   beforeEach(() => {
//     res = mockResponse();
//     sandbox = sinon.createSandbox();
//   });
//   afterEach(() => {
//     sandbox.restore();
//   });

//   describe('createShip', function () {
//     it('should return error is a request has a type that already exist', async () => {
//       const req = {
//         body: {
//           status: 'active',
//           direction: 'setup',
//           type: 'Submarines',
//           length: 1,
//           health: 1,
//           coordinate: [],
//           aroundCoordinate: [],
//         },
//       } as Request;
//       const mError = new Error('A ship type already exists');
//       const stub = sandbox.stub(FleetService, 'createShip').rejects(mError);
//       await FleetController.createShip(req, res);

//       expect(stub.calledOnce).to.be.false;
//       expect(res.json.calledOnce).to.be.true;
//       expect(res.status).to.have.been.calledWith(401);
//       expect(res.json).to.have.been.calledWith({ success: true, message: 'A ship already exist', data: true });
//     });
//     it('should not create a ship when request body are not provided', async function () {
//       const req = { body: {} } as Request;
//       await FleetController.createShip(req, res);
//       expect(res.status.calledOnce).to.be.true;
//       expect(res.status).to.have.been.calledWith(401);
//       expect(res.json.calledOnce).to.be.true;
//       expect(res.json).to.have.been.calledWith({ success: false, message: 'Error occurred while creating a ship' });
//     });
//     it('should create a ship successfully', async function (done) {
//       const req = {
//         body: {
//           status: 'active',
//           direction: 'setup',
//           type: 'Submarines',
//           length: 1,
//           health: 1,
//           coordinate: [],
//           aroundCoordinate: [],
//         },
//       } as Request;
//       const stubValue = {
//         id: faker.random.uuid(),
//         status: 'active',
//         direction: 'setup',
//         type: 'Submarines',
//         length: 1,
//         health: 1,
//         coordinate: [],
//         aroundCoordinate: [],
//         createdAt: faker.date.past(),
//         updatedAt: faker.date.past(),
//       };

//       const stub = sandbox.stub(FleetService, 'createShip').returns(stubValue);
//       await FleetController.createShip(req, res);

//       expect(stub.calledOnce).to.be.true;
//       expect(res.status.calledOnce).to.be.true;
//       expect(res.json.calledOnce).to.be.true;
//       expect(res.status).to.have.been.calledWith(200);
//       expect(res.json).to.have.been.calledWith({
//         success: true,
//         message: 'A ship is created successfully',
//         data: stubValue,
//       });
//       done();
//     });
//   });
// });
