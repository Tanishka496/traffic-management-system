const driverModel = require("../models/driverModel");
exports.createDriver = (req, res) => {
  const driver = req.body;
  driverModel.addDriver(driver, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error adding driver" });
    }
    res.json({ message: "Driver added successfully", id: result.insertId });
  });
};
exports.getDrivers = (req, res) => {
  driverModel.getDrivers((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching drivers" });
    }
    res.json(result);
  });
};