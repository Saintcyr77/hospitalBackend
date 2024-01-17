const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.get('/', patientController.get_patients);

module.exports = router;