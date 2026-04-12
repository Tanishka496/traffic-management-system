const driverModel = require("../models/driverModel");

exports.addDriver = (req, res) => {
  const driverData = req.body;

  if (!driverData.name) {
    return res.status(400).json({ message: "name is required" });
  }

  driverModel.addDriver(driverData, (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error adding driver", error: err.message });
    }

    return res
      .status(201)
      .json({ message: "Driver added successfully", id: result.insertId });
  });
};

exports.getDrivers = (_req, res) => {
  driverModel.getDrivers((err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching drivers", error: err.message });
    }

    return res.json(result);
  });
};
