// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import http from 'http';

// import app from '../../../server';
// import { clearDatabase, closeDatabase } from '../../test-helper';

// let server, request;

// chai.use(chaiHttp);

// before(async () => {
//   server = http.createServer(app);
//   await server.listen();
//   request = chai.request(server);
// });
// /**
//  * Clear all test data after every test.
//  */
// afterEach(async () => {
//   await clearDatabase();
// });

// /**
//  * Remove and close the test db and server.
//  */
// afterEach(async () => {
//   await server.close();
//   await closeDatabase();
// });

// describe('Fleet Integration Testing', () => {
//   it('should create a ship on /fleet POST', async function (done) {
//     const newShip: any = {
//       status: 'active',
//       direction: 'setup',
//       type: 'Submarines',
//       length: 1,
//       health: 1,
//       coordinate: [],
//       aroundCoordinate: [],
//     };

//     const res = await request.post('/api/v1/fleet/create').set('Accept', 'application/json').send(newShip);

//     const { _id, status } = res.body.data;

//     expect(res.status).to.have.been.calledWith(200);
//     expect(_id).to.not.be.undefined;
//     expect(status).to.be(newShip.status);
//   });
// });
