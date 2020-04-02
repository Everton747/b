const driverDB = require('../db/driverDB');

async function findDrivers(params) {

  const dbResponse = await driverDB.find(params);
  if(!dbResponse) return dbResponse;

  dbResponse.map((element) => {
    element.id = element._id;
    delete element._id;
    return element
  });

  return dbResponse;
}

async function newDriver(name, age, genre, isAutonomous, cnhType, vehicleType) {
  const dbResponse = await driverDB.insert(name, age, genre, isAutonomous, cnhType, vehicleType);
  if (!dbResponse) return dbResponse;

  return { id: dbResponse };
}

async function updateDriver(id, param) {

  const dbResponse = await driverDB.update(id, param);
  if(!dbResponse) return dbResponse;

  let response = dbResponse.value;
  response.id = response._id;
  delete response._id;

  return response;
}

module.exports = { findDrivers, newDriver, updateDriver };

