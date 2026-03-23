const vehicleModel = require("../models/vehicleModel");

exports.addVehicle = (req, res) => {
  const vehicleData = req.body;

  if (!vehicleData.vehicle_number || !vehicleData.owner_name || !vehicleData.vehicle_type) {
    return res.status(400).json({ message: "vehicle_number, owner_name and vehicle_type are required" });
  }

  vehicleModel.addVehicle(vehicleData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error adding vehicle", error: err.message });
    }

    return res.status(201).json({ message: "Vehicle added successfully", id: result.insertId });
  });
};

exports.getVehicles = (_req, res) => {
  vehicleModel.getVehicles((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching vehicles", error: err.message });
    }

    return res.json(result);
  });
};
