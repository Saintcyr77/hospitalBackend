const express = require("express");
const patientController = require("../controllers/patientController");

const router = express.Router();

router.get("/", patientController.get_patients);
router.post("/", patientController.post_patients);
router.get("/:id", patientController.get_patient_by_id);
router.delete("/:id", patientController.delete_patient);
router.patch("/:id", patientController.update_patient_by_id);

module.exports = router;
