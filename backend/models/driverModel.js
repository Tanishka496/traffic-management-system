const db = require("../config/db");

// Add driver
const addDriver = (driver, callback) => {
  const sql = "INSERT INTO driver (name, license_number, phone) VALUES (?, ?, ?)";
  db.query(sql, [driver.name, driver.license_number, driver.phone], callback);
};

// Get all drivers
const getDrivers = (callback) => {
  const sql = "SELECT driver_id AS id, name, license_number, phone, address FROM driver";
  db.query(sql, callback);
};

module.exports = { addDriver, getDrivers };