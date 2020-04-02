const express = require('express');
const router = express.Router();

const drivers = require('../controllers/driverController');

router.get('/drivers', drivers.getDrivers);
router.post('/drivers', drivers.postDriver);
router.put('/drivers', drivers.putDriver);
router.delete('/drivers', drivers.deleteDriver);

module.exports = router;
