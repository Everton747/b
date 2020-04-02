const driverService = require('../services/driverService');

async function getDriver(req, res, next) {

}

async function postDriver(req, res, next) {
  const { name, age, genre, isAutonomous, cnhType, vehicleType } = req.body;
  if (!name || !age || !genre || !isAutonomous || !cnhType || !vehicleType) {
    return res.sendStatus(400);
  }

  const response = await driverService.newDriver(name, age, genre, isAutonomous, cnhType, vehicleType);
  if (response) return res.json(response);

  return res.sendStatus(500);
}

async function putDriver(req, res, next) {

}

async function deleteDriver(req, res, next) {

}

module.exports = { getDriver, postDriver, putDriver, deleteDriver };
