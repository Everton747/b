const driverDB = require('../db/driverDB');

async function newDriver(name, age, genre, isAutonomous, cnhType, vehicleType) {
  const dbResponse = await driverDB.insert(name, age, genre, isAutonomous, cnhType, vehicleType);
  if (!dbResponse) return dbResponse;

  return { id: dbResponse };
}

async function updateDriver(id, param) {
return 'anything'
}

module.exports = { newDriver, updateDriver };

