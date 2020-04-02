const expect = require('chai').expect;
const sinon = require('sinon');
const chai = require('chai');
const { mockRequest, mockResponse } = require('mock-req-res');

chai.use(require('sinon-chai'));

const { getDrivers, postDriver, putDriver, deleteDriver } = require('../../src/controllers/driverController');
const driverService = require('../../src/services/driverService');

describe('driverController', () => {

  var fakeCall;

  beforeEach(() => {
    fakeCall = sinon.stub();
  });

  afterEach(() => {
    if (fakeCall.restore)
      fakeCall.restore();
  });

  describe('Smoke Tests', () => {

    it('should exist get method', () => {
      expect(getDrivers).to.exist;
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

  describe('getDrivers', () => {

    it('should call findDrivers service without param', () => {

      let req = mockRequest();
      let res = mockResponse();

      fakeCall = sinon.stub(driverService, 'findDrivers');

      getDrivers(req, res);
      expect(fakeCall).to.have.calledWith();
    });

    it('should call findDrivers service with params', () => {

      let req = mockRequest({
        body: {
          isLoaded: true,
        }
      });
      let res = mockResponse();

      fakeCall = sinon.stub(driverService, 'findDrivers');

      getDrivers(req, res);
      expect(fakeCall).to.have.calledWith({ isLoaded: true });
    });

    it('should return response of findDrivers', async () => {

      let req = mockRequest();
      let res = mockResponse();

      fakeCall = sinon.stub(driverService, 'findDrivers').resolves([]);

      await getDrivers(req, res);
      expect(res.json).to.have.calledWith([]);

      fakeCall.resolves(['driver', 'driver2']);

      await getDrivers(req, res);
      expect(res.json).to.have.calledWith(['driver', 'driver2']);
    });

    it('should return 500 if findDrivers service returns undefined', async () => {

      let req = mockRequest();
      let res = mockResponse();

      fakeCall = sinon.stub(driverService, 'findDrivers').resolves(undefined);

      await getDrivers(req, res);
      expect(res.sendStatus).to.have.calledWith(500);
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
          "vehicleType": 5,
          "isLoaded": true,
          "from": "São Paulo - SP",
          "destination": "Fortaleza - CE",
        }
      }

      let res = mockResponse();

      fakeCall = sinon.stub(driverService, 'newDriver').resolves({ id: 'qwerty' });

      await postDriver(req, res);
      expect(fakeCall).to.have.been.calledOnce;
    });

    it('should return id if insertion is okay', async () => {
      let req = {
        body: {
          "name": "Everton Vanzela",
          "age": 23,
          "genre": "Masculino",
          "isAutonomous": true,
          "cnhType": "D",
          "vehicleType": 5,
          "isLoaded": true,
          "from": "São Paulo - SP",
          "destination": "Fortaleza - CE",
        }
      }

      let res = mockResponse();

      fakeCall = sinon.stub(driverService, 'newDriver').resolves({ id: 'qwerty' });

      await postDriver(req, res);
      expect(res.json).to.have.been.calledWith({ id: 'qwerty' });
    });

    it('should return 500 if insertion is errored', async () => {
      let req = {
        body: {
          "name": "Everton Vanzela",
          "age": 23,
          "genre": "Masculino",
          "isAutonomous": true,
          "cnhType": "D",
          "vehicleType": 5,
          "isLoaded": true,
          "from": "São Paulo - SP",
          "destination": "Fortaleza - CE",
        }
      }

      let res = mockResponse();

      fakeCall = sinon.stub(driverService, 'newDriver').resolves(undefined);

      await postDriver(req, res);
      expect(res.sendStatus).to.have.been.calledWith(500);
    });

    it('should return 400 if have missing parameters', () => {
      let req = {
        body: {
          "name": "Everton Vanzela",
          "age": 23,
          "genre": "Masculino",
          "isAutonomous": false,
          // "cnhType": "D",
          "vehicleType": 5,
          "isLoaded": false,
          // "from": "São Paulo - SP",
          "destination": "Fortaleza - CE",
        }
      }

      let res = mockResponse();

      postDriver(req, res);
      expect(res.sendStatus).to.have.been.calledWith(400);
    });
  });

  describe('PutDriver', () => {

    it('should call updateDriver service if contains all parameters', () => {

      let req = {
        query: {
          id: 102030,
        },
        body: {
          name: 'João',
        }
      };

      let res = mockResponse();

      fakeCall = sinon.stub(driverService, 'updateDriver');

      putDriver(req, res);
      expect(fakeCall).to.have.been.called;
    });

    it('should return driver object if update is success', async () => {

      let req = {
        query: {
          id: 102030,
        },
        body: {
          name: 'João',
        }
      };

      let res = mockResponse();

      let fakeReturn = {
        id: 102030,
        name: "João",
        age: 23,
        genre: "Masculino",
        isAutonomous: true,
        cnhType: "D",
        vehicleType: 5
      };


      fakeCall = sinon.stub(driverService, 'updateDriver').returns({ fakeReturn });

      await putDriver(req, res);
      expect(res.send).to.have.been.calledWith({ fakeReturn });
    });

    it('should return 500 if update is errored', async () => {

      let req = {
        query: {
          id: 102030,
        },
        body: {
          name: 'João',
        }
      };

      let res = mockResponse();

      fakeCall = sinon.stub(driverService, 'updateDriver').returns(undefined);

      await putDriver(req, res);
      expect(res.sendStatus).to.have.been.calledWith(500);
    });

    it('should return 400 if dont have update body', async () => {

      let req = {
        query: {
          id: '102030',
        }
      };
      let res = mockResponse();

      await putDriver(req, res);
      expect(res.sendStatus).to.have.been.calledWith(400);
    });

    it('should return 404 if dont have id in query params', async () => {

      let req = mockRequest();
      let res = mockResponse();

      await putDriver(req, res);
      expect(res.sendStatus).to.have.been.calledWith(400);
    });
  });

});
