const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.get('/', patientController.get_patients);
router.post('/', patientController.post_patients);

module.exports = router; 