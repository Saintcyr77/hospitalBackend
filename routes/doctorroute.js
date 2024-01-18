const express = require("express");
const doctorController = require("../controllers/doctorController");
const router = express.Router();

router.get("/", doctorController.get_all_doctors);
router.post("/", doctorController.create_doctor);
router.get("/:id", doctorController.get_doctor_by_id);
router.delete("/:id", doctorController.delete_doctor);
router.patch("/:id", doctorController.update_doctor_by_id);

module.exports = router;
