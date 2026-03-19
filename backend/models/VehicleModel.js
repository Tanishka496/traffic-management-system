const db = require("../config/db");

const Vehicle = {

  // Add vehicle
  addVehicle: (data, callback) => {
    const sql = "INSERT INTO vehicles SET ?";
    db.query(sql, data, callback);
  },

  // Get all vehicles
  getVehicles: (callback) => {
    const sql = "SELECT * FROM vehicles";
    db.query(sql, callback);
  }

};

module.exports = Vehicle;