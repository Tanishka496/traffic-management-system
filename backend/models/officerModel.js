const db = require("../config/db");

const getOfficers = (callback) => {
  const sql =
    "SELECT officer_id, name, badge_number, station, phone FROM officer ORDER BY officer_id DESC";
  db.query(sql, callback);
};

module.exports = { getOfficers };
