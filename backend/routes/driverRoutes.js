const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");

router.post("/", driverController.createDriver);
router.get("/", driverController.getDrivers);
router.put("/:id", driverController.updateDriver);

module.exports = router;