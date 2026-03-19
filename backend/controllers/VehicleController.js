const Vehicle = require("../models/vehicleModel");

exports.addVehicle = (req, res) => {

  const vehicleData = req.body;

  Vehicle.addVehicle(vehicleData, (err, result) => {

    if (err) {
      res.status(500).json(err);
    } else {
      res.json({ message: "Vehicle added successfully" });
    }

  });

};


exports.getVehicles = (req, res) => {

  Vehicle.getVehicles((err, result) => {

    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }

  });

};