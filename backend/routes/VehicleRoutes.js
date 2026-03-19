const express = require("express");
const router = express.Router();

const vehicleController = require("../controllers/VehicleController");


router.post("/vehicles", vehicleController.addVehicle);

router.get("/vehicles", vehicleController.getVehicles);


module.exports = router;