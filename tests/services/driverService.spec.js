const expect = require('chai').expect;
const sinon = require('sinon');
const chai = require('chai');

chai.use(require('sinon-chai'));

const { newDriver, updateDriver } = require('../../src/services/driverService');

const driverDB = require('../../src/db/driverDB');

describe('driverService', () => {

  describe('Smoke Tests', () => {
    it('should exist newDriver method', () => {
      expect(newDriver).to.be.exist;
    });
    it('should exist updateDriver method', () => {
      expect(updateDriver).to.be.exist;
    });
  });

  describe('New Driver', () => {

    it('should return id case dbResponse is success', async () => {

      let fakeDbCall =
        sinon.stub(driverDB, 'insert').resolves('qwerty');

      let response = await newDriver();
      expect(response).to.eql({ id: 'qwerty' });

      fakeDbCall.restore();
    });

    it('should return undefined, case dbResponse is error', async () => {

      let fakeDbCall =
        sinon.stub(driverDB, 'insert').resolves(undefined);

      let response = await newDriver();
      expect(response).to.equal(undefined);

      fakeDbCall.restore();
    });
  });

  describe('Update Driver', () => {

    it('should return driver data if dbResponse is success', async () => {

      let fakeReturn = {
        lastErrorObject: { n: 1, updatedExisting: true },
        value: {
          _id: '5e8623899371e75f54af98d7',
          name: 'Everton Vanzella',
          age: 23,
          genre: 'Masculino',
          isAutonomous: true,
          cnhType: 'D',
          vehicleType: true
        },
        ok: 1
      }

      let expectedResponse = {
        id: '5e8623899371e75f54af98d7',
        name: 'Everton Vanzella',
        age: 23,
        genre: 'Masculino',
        isAutonomous: true,
        cnhType: 'D',
        vehicleType: true
      }

      let fakeDbCall =
        sinon.stub(driverDB, 'update').resolves(fakeReturn);

      let response = await updateDriver();
      expect(response).to.eql(expectedResponse);

      fakeDbCall.restore();
    });

    it('should return undefined, case dbResponse is error', async () => {

      let fakeDbCall =
        sinon.stub(driverDB, 'update').resolves(undefined);

      let response = await updateDriver();
      expect(response).to.equal(undefined);

      fakeDbCall.restore();
    });
  });
});

