const expect = require('chai').expect;
const sinon = require('sinon');
const chai = require('chai');
const { mockRequest, mockResponse } = require('mock-req-res');

chai.use(require('sinon-chai'));

const { getDriver, postDriver, putDriver, deleteDriver } = require('../../src/controllers/driverController');
const driverService = require('../../src/services/driverService');

describe('driverController', () => {

  describe('Smoke Tests', () => {

    it('should exist get method', () => {
      expect(getDriver).to.exist;
    });
    it('should exist post method', () => {
      expect(postDriver).to.exist;
    });
    it('should exist put method', () => {
      expect(putDriver).to.exist;
    });
    it('should exist delete method', () => {
      expect(deleteDriver).to.exist;
    });
  });

  describe('PostDriver', () => {

    it('should call newDriver service if contains all parameters', async () => {
      let req = {
        body: {
          "name": "Everton Vanzela",
          "age": 23,
          "genre": "Masculino",
          "isAutonomous": true,
          "cnhType": "D",
          "vehicleType": 5
        }
      }

      let res = mockResponse();

      let fakeCall =
        sinon.stub(driverService, 'newDriver').resolves({ id: 'qwerty' });

      await postDriver(req, res);
      expect(fakeCall).to.have.been.calledOnce;

      fakeCall.restore();
    });

    it('should return id if insertion is okay', async () => {
      let req = {
        body: {
          "name": "Everton Vanzela",
          "age": 23,
          "genre": "Masculino",
          "isAutonomous": true,
          "cnhType": "D",
          "vehicleType": 5
        }
      }

      let res = mockResponse();

      let fakeCall =
        sinon.stub(driverService, 'newDriver').resolves({ id: 'qwerty' });

      await postDriver(req, res);
      expect(res.json).to.have.been.calledWith({ id: 'qwerty' });

      fakeCall.restore();
    });

    it('should return 500 if insertion is errored', async () => {
      let req = {
        body: {
          "name": "Everton Vanzela",
          "age": 23,
          "genre": "Masculino",
          "isAutonomous": true,
          "cnhType": "D",
          "vehicleType": 5
        }
      }

      let res = mockResponse();

      let fakeCall =
        sinon.stub(driverService, 'newDriver').resolves(undefined);

      await postDriver(req, res);
      expect(res.sendStatus).to.have.been.calledWith(500);

      fakeCall.restore();
    });

    it('should return 400 if have missing parameters', () => {
      let req = {
        body: {
          "name": "Everton Vanzela",
          "age": 23,
          "genre": "Masculino",
          "isAutonomous": true,
          // "cnhType": "D",
          "vehicleType": 5
        }
      }

      let res = mockResponse();

      postDriver(req, res);
      expect(res.sendStatus).to.have.been.calledWith(400);
    });
  });

});
