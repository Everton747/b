const expect = require('chai').expect;

const { getDriver, postDriver, putDriver, deleteDriver } = require('../../src/controllers/driverController');

describe('driverController', () => {

  describe('Smoke Tests', () => {

    it('should exist get function', () => {
      expect(getDriver).to.exist;
    });
    it('should exist post function', () => {
      expect(postDriver).to.exist;
    });
    it('should exist put function', () => {
      expect(putDriver).to.exist;
    });
    it('should exist delete function', () => {
      expect(deleteDriver).to.exist;
    });

  });

});
