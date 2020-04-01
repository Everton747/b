const expect = require('chai').expect;
const { mockRequest, mockResponse } = require('mock-req-res')

const { getDriver, postDriver, putDriver, deleteDriver } = require('../../src/controllers/driverController');

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

    it('should return 200 if contains all parameters', () => {
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

      postDriver(req, res);
      expect(res.sendStatus).to.have.been.calledWith(200);
    });

    it('should return 400 if have missing parameters', () => {
      let req = {
        body: {
          "name": "Everton Vanzela",
          "age": 23,
          "genre": "Masculino",
          "isAutonomous": true,
          // "cnhType": "D",
          "vehicleType": 5,
          "isLoaded": true
        }
      }

      let res = mockResponse();

      postDriver(req, res);
      expect(res.sendStatus).to.have.been.calledWith(400);
    });
  });

});
