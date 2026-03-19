const Vehicle = require("../models/vehicleModel");

exports.addVehicle = (req, res) => {

  const vehicleData = req.body;

exports.getVehicles = (req, res) => {
  Vehicle.getVehicles((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
};

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