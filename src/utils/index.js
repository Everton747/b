const cities = require('all-the-cities');

function getCityLatLong(cityName) {

  const city = cities.filter(city => city.name === cityName).sort((a, b) => b.population - a.population)[0];
  if (city === undefined) return { lat: 0, long: 0 };

  const latLongObj = {
    lat: city.loc.coordinates[1],
    long: city.loc.coordinates[0],
  }

  return latLongObj;
}

module.exports = { getCityLatLong }
