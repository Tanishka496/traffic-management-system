const db = require("../config/db");

const addVehicle = (vehicle, callback) => {
  const sql =
    "INSERT INTO vehicle (vehicle_number, owner_name, vehicle_type, driver_id) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [vehicle.vehicle_number, vehicle.owner_name, vehicle.vehicle_type, vehicle.driver_id],
    callback
  );
};

const getVehicles = (callback) => {
  const sql =
    "SELECT vehicle_id, vehicle_number, owner_name, vehicle_type, driver_id FROM vehicle ORDER BY vehicle_id DESC";
  db.query(sql, callback);
};

module.exports = { addVehicle, getVehicles };
