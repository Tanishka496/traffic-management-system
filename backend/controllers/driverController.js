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
  const { license_number } = req.query;

  if (license_number) {
    return driverModel.findByLicense(license_number, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error searching driver" });
      }
      return res.json(result);
    });
  }

  driverModel.getDrivers((err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching drivers" });
    }
    res.json(result);
  });
};

exports.updateDriver = (req, res) => {
  const { id } = req.params;
  driverModel.updateDriver(id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating driver" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Driver not found" });
    }

    return res.json({ message: "Driver updated successfully" });
  });
};