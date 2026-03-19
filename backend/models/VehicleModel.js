const db = require("../config/db");

const Vehicle = {

  addVehicle: (vehicleData, callback) => {
    const sql =
      "INSERT INTO vehicles (vehicle_number, owner_name, vehicle_type, driver_id) VALUES (?, ?, ?, ?)";

    db.query(
      sql,
      [
        vehicleData.vehicle_number,
        vehicleData.owner_name,
        vehicleData.vehicle_type,
        vehicleData.driver_id
      ],
      callback
    );
  },

  getVehicles: (callback) => {
    const sql = "SELECT * FROM vehicles";
    db.query(sql, callback);
  }

};

module.exports = Vehicle;