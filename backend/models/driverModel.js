const db = require("../config/db");

const addDriver = (driver, callback) => {
  const sql =
    "INSERT INTO driver (name, license_number, phone, address) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [driver.name, driver.license_number || null, driver.phone || null, driver.address || null],
    callback,
  );
};

const getDrivers = (callback) => {
  const sql =
    "SELECT driver_id, name, license_number, phone, address FROM driver ORDER BY driver_id DESC";
  db.query(sql, callback);
};

module.exports = { addDriver, getDrivers };
