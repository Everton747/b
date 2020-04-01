const express = require('express');
const router = express.Router();

const drivers = require('../controllers/driverController');

router.get('/drivers', drivers.getDriver);

module.exports = router;
