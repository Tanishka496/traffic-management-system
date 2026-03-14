const db = require('../config/db');

const ViolationModel = {

  addViolation: (violation_type, fine_amount, callback) => {
    const sql = "INSERT INTO violation (violation_type, fine_amount) VALUES (?, ?)";
    db.query(sql, [violation_type, fine_amount], callback);
  },

  getAllViolations: (callback) => {
    const sql = "SELECT * FROM violation";
    db.query(sql, callback);
  },

  updateViolation: (id, violation_type, fine_amount, callback) => {
    const sql = "UPDATE violation SET violation_type=?, fine_amount=? WHERE violation_id=?";
    db.query(sql, [violation_type, fine_amount, id], callback);
  },

  deleteViolation: (id, callback) => {
    const sql = "DELETE FROM violation WHERE violation_id=?";
    db.query(sql, [id], callback);
  }

};

module.exports = ViolationModel;