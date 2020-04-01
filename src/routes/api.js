const express = require('express');
const router = express.Router();

const drivers = require('../controllers/driverController');

router.get('/drivers', drivers.index);
router.get('/drivers', drivers.index);

module.exports = router;
