const driverDB = require('../db/driverDB');
const { getCityLatLong } = require('../utils/index');

async function findDrivers(params) {

  const dbResponse = await driverDB.find(params);
  if (!dbResponse) return dbResponse;

  dbResponse.map((element) => {
    element.id = element._id;
    delete element._id;
    return element
  });

  return dbResponse;
}

async function newDriver(name, age, genre, isAutonomous, cnhType, isLoaded, vehicleType, from, destination) {

  let driver = {
    name,
    age,
    genre,
    isAutonomous,
    isLoaded,
    cnhType,
    vehicleType,
    from: {
      city: from,
      coord: getCityLatLong(from),
    },
    destination: {
      city: destination,
      coord: getCityLatLong(destination),
    },
    createdAt: new Date(),
  }

  const dbResponse = await driverDB.insert(driver);
  if (!dbResponse) return dbResponse;

  // return undefined
  return { id: dbResponse };
}

async function updateDriver(id, param) {

  const dbResponse = await driverDB.update(id, param);
  if (!dbResponse) return dbResponse;

  let response = dbResponse.value;
  response.id = response._id;
  delete response._id;

  return response;
}

module.exports = { findDrivers, newDriver, updateDriver };

