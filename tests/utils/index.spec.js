const expect = require('chai').expect;

const { getCityLatLong } = require('../../src/utils/index');

describe('Utils', () => {

  describe('Smoke Tests', () => {

    it('should exist getCityLatLong', () => {
      expect(getCityLatLong).to.have;
    });
  });

  describe('getCityLatLong', () => {

    it('should return object when pass city param', () => {

      let returned = getCityLatLong('São Paulo');
      expect(returned).to.be.an('object');
    });

    it('should return object with lat,long obj when pass city param', () => {

      let returned = getCityLatLong('São Paulo');
      let returned2 = getCityLatLong('Campo Grande');

      expect(returned).to.be.eqls({ lat: -23.5475, long: -46.63611 });
      expect(returned2).to.be.eqls({ lat: -20.44278, long: -54.64639 });
    });

    it('should return lat,lng=0 object when city does not exist', () => {

      let returned = getCityLatLong('ksjdasld');
      expect(returned).to.be.eqls({ lat: 0, long: 0 });
    });
  })
});
