const expect = require('chai').expect;

const { newDriver } = require('../../src/services/driverService');

describe('driverService', () => {

  describe('Smoke Tests', () => {
    it('should exist newDriver method', () => {
      expect(newDriver).to.be.exist;
    });
  });

  describe('New Driver', () => {

    // it
  });
});

